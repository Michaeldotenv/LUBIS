from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.db.session import get_db
from app.models.order import Customer, Order, OrderItem
from app.schemas.order import OrderCreate, OrderRead

router = APIRouter(prefix="/orders", tags=["orders"])


def make_order_number() -> str:
    return f"LB{datetime.now(UTC).strftime('%Y%m%d%H%M%S%f')}"


@router.post("", response_model=OrderRead)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)) -> Order:
    subtotal = sum(item.quantity * item.unit_price for item in payload.items)
    if subtotal <= 0:
        raise HTTPException(status_code=400, detail="Order total must be greater than zero")

    customer = Customer(**payload.customer.model_dump())
    order = Order(
        order_number=make_order_number(),
        customer=customer,
        delivery_address=payload.delivery_address,
        subtotal=subtotal,
        delivery_fee=payload.delivery_fee,
        total=subtotal + payload.delivery_fee,
    )
    for item in payload.items:
        order.items.append(OrderItem(**item.model_dump(), line_total=item.quantity * item.unit_price))

    db.add(order)
    db.commit()
    stmt = select(Order).options(selectinload(Order.customer), selectinload(Order.items)).where(Order.id == order.id)
    return db.scalar(stmt)


@router.get("/{order_id}", response_model=OrderRead)
def get_order(order_id: int, db: Session = Depends(get_db)) -> Order:
    stmt = select(Order).options(selectinload(Order.customer), selectinload(Order.items)).where(Order.id == order_id)
    order = db.scalar(stmt)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
