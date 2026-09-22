import pytest

from app.api.routes.orders import create_order, get_order
from app.api.routes.payments import initialize_paystack, verify_paystack
from app.schemas.order import CustomerCreate, OrderCreate, OrderItemCreate
from app.schemas.payment import PaystackInitializeRequest


@pytest.mark.anyio
async def test_order_create_and_local_paystack_initialize(db_session):
    order = create_order(
        OrderCreate(
            customer=CustomerCreate(name="Ada Lovelace", email="ada@example.com", phone="+2348000000000"),
            delivery_address="12 Admiralty Way, Lekki",
            items=[
                OrderItemCreate(
                    product_slug="signature-cotton-shirt",
                    product_name="Signature Cotton Shirt",
                    size="M",
                    color="White",
                    quantity=2,
                    unit_price=21500,
                )
            ],
        ),
        db_session,
    )

    assert order.total == 43000
    assert order.status == "pending"

    payment = await initialize_paystack(
        PaystackInitializeRequest(order_id=order.id, email="ada@example.com"),
        db_session,
    )

    assert payment.reference.startswith(f"LUBIS-{order.id}-")
    assert payment.authorization_url is None

    verified = await verify_paystack(payment.reference, db_session)

    assert verified.status == "paid"
    assert get_order(order.id, db_session).status == "paid"


@pytest.mark.anyio
async def test_second_payment_flow_is_independent(db_session):
    order = create_order(
        OrderCreate(
            customer=CustomerCreate(name="Grace Hopper", email="grace@example.com"),
            delivery_address="Victoria Island, Lagos",
            items=[
                OrderItemCreate(
                    product_slug="weekend-knit-set",
                    product_name="Weekend Knit Set",
                    size="L",
                    color="Charcoal",
                    quantity=1,
                    unit_price=39000,
                )
            ],
        ),
        db_session,
    )

    payment = await initialize_paystack(
        PaystackInitializeRequest(order_id=order.id, email="grace@example.com"),
        db_session,
    )
    verified = await verify_paystack(payment.reference, db_session)

    assert verified.order_id == order.id
    assert verified.status == "paid"
    assert get_order(order.id, db_session).total == 39000
