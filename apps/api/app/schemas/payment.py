from pydantic import BaseModel


class PaystackInitializeRequest(BaseModel):
    order_id: int
    email: str


class PaystackInitializeResponse(BaseModel):
    reference: str
    authorization_url: str | None = None
    access_code: str | None = None


class PaystackVerifyResponse(BaseModel):
    reference: str
    status: str
    order_id: int
