from pydantic import BaseModel


class ContactCreate(BaseModel):
    name: str
    email: str
    phone: str | None = None
    message: str


class ContactRead(ContactCreate):
    id: int

    model_config = {"from_attributes": True}


class InquiryCreate(BaseModel):
    name: str
    email: str
    phone: str | None = None
    subject: str | None = None
    message: str
    source: str = "website"


class InquiryRead(InquiryCreate):
    id: int

    model_config = {"from_attributes": True}
