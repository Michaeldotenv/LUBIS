from fastapi import APIRouter, Depends, Header, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.order import Order
from app.models.payment import Payment
from app.schemas.payment import PaystackInitializeRequest, PaystackInitializeResponse, PaystackVerifyResponse
from app.services.paystack import initialize_transaction, make_reference, verify_transaction, verify_webhook_signature

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/paystack/initialize", response_model=PaystackInitializeResponse)
async def initialize_paystack(payload: PaystackInitializeRequest, db: Session = Depends(get_db)) -> PaystackInitializeResponse:
    order = db.get(Order, payload.order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.status == "paid":
        raise HTTPException(status_code=400, detail="Order is already paid")

    reference = make_reference(order.id)
    payment = Payment(order_id=order.id, reference=reference, amount=order.total)
    db.add(payment)
    db.commit()

    paystack_data = await initialize_transaction(payload.email, order.total, reference)
    payment.provider_payload = paystack_data
    db.add(payment)
    db.commit()

    return PaystackInitializeResponse(
        reference=reference,
        authorization_url=paystack_data.get("authorization_url"),
        access_code=paystack_data.get("access_code"),
    )


@router.get("/paystack/verify/{reference}", response_model=PaystackVerifyResponse)
async def verify_paystack(reference: str, db: Session = Depends(get_db)) -> PaystackVerifyResponse:
    payment = db.scalar(select(Payment).where(Payment.reference == reference))
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    data = await verify_transaction(reference)
    status = data.get("status", "failed")
    payment.status = "paid" if status == "success" else status
    payment.provider_payload = data

    order = db.get(Order, payment.order_id)
    if order and payment.status == "paid":
        order.status = "paid"

    db.commit()
    return PaystackVerifyResponse(reference=payment.reference, status=payment.status, order_id=payment.order_id)


@router.post("/paystack/webhook")
async def paystack_webhook(
    request: Request,
    x_paystack_signature: str | None = Header(default=None),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    raw_body = await request.body()
    if not verify_webhook_signature(raw_body, x_paystack_signature):
        raise HTTPException(status_code=401, detail="Invalid Paystack signature")

    payload = await request.json()
    event = payload.get("event")
    data = payload.get("data", {})
    reference = data.get("reference")
    if not reference:
        return {"status": "ignored"}

    payment = db.scalar(select(Payment).where(Payment.reference == reference))
    if not payment:
        return {"status": "ignored"}

    payment.provider_payload = payload
    if event == "charge.success" and data.get("status") == "success":
        payment.status = "paid"
        order = db.get(Order, payment.order_id)
        if order:
            order.status = "paid"
    elif event and event.startswith("charge."):
        payment.status = data.get("status", "failed")

    db.commit()
    return {"status": "processed"}
