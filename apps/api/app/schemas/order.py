from pydantic import BaseModel, Field


class CustomerCreate(BaseModel):
    name: str
    email: str
    phone: str | None = None


class OrderItemCreate(BaseModel):
    product_slug: str
    product_name: str
    size: str
    color: str
    quantity: int = Field(gt=0)
    unit_price: int = Field(gt=0)


class OrderCreate(BaseModel):
    customer: CustomerCreate
    delivery_address: str
    delivery_fee: int = Field(default=0, ge=0)
    items: list[OrderItemCreate] = Field(min_length=1)


class OrderItemRead(OrderItemCreate):
    id: int
    line_total: int

    model_config = {"from_attributes": True}


class CustomerRead(CustomerCreate):
    id: int

    model_config = {"from_attributes": True}


class OrderRead(BaseModel):
    id: int
    order_number: str
    status: str
    delivery_address: str
    subtotal: int
    delivery_fee: int
    total: int
    customer: CustomerRead
    items: list[OrderItemRead]

    model_config = {"from_attributes": True}
