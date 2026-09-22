from fastapi import APIRouter, BackgroundTasks, Depends, Request
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.contact import Contact, Inquiry
from app.schemas.contact import ContactCreate, ContactRead, InquiryCreate, InquiryRead
from app.services.mailer import notify_contact_submission, notify_inquiry_submission

router = APIRouter(tags=["contacts"])


async def parse_payload(request: Request) -> dict:
    content_type = request.headers.get("content-type", "")
    if "application/json" in content_type:
        return await request.json()
    form = await request.form()
    return dict(form)


@router.post("/contacts", response_model=ContactRead)
async def create_contact(request: Request, background_tasks: BackgroundTasks, db: Session = Depends(get_db)) -> Contact:
    payload = ContactCreate(**await parse_payload(request))
    contact = Contact(**payload.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    background_tasks.add_task(notify_contact_submission, contact.id, payload)
    return contact


@router.post("/inquiries", response_model=InquiryRead)
async def create_inquiry(request: Request, background_tasks: BackgroundTasks, db: Session = Depends(get_db)) -> Inquiry:
    payload = InquiryCreate(**await parse_payload(request))
    inquiry = Inquiry(**payload.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    background_tasks.add_task(notify_inquiry_submission, inquiry.id, payload)
    return inquiry
