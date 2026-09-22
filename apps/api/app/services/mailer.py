import logging
import smtplib
from email.message import EmailMessage
from email.utils import formataddr

from app.core.config import settings
from app.schemas.contact import ContactCreate, InquiryCreate

logger = logging.getLogger(__name__)


def mail_enabled() -> bool:
    return bool(settings.smtp_host and settings.notification_email and settings.smtp_from_email)


def send_email(subject: str, body: str, reply_to: str | None = None) -> None:
    if not mail_enabled():
        logger.info("SMTP is not configured; skipping email notification for %s", subject)
        return

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = formataddr((settings.smtp_from_name, settings.smtp_from_email))
    message["To"] = settings.notification_email
    if reply_to:
        message["Reply-To"] = reply_to
    message.set_content(body)

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as smtp:
            if settings.smtp_use_tls:
                smtp.starttls()
            if settings.smtp_username and settings.smtp_password:
                smtp.login(settings.smtp_username, settings.smtp_password)
            smtp.send_message(message)
    except Exception:
        logger.exception("Could not send email notification for %s", subject)


def notify_contact_submission(contact_id: int, payload: ContactCreate) -> None:
    send_email(
        subject=f"New Lubis contact message #{contact_id}",
        reply_to=payload.email,
        body="\n".join(
            [
                "A new contact message was submitted on the Lubis website.",
                "",
                f"Contact ID: {contact_id}",
                f"Name: {payload.name}",
                f"Email: {payload.email}",
                f"Phone: {payload.phone or 'Not provided'}",
                "",
                "Message:",
                payload.message,
            ]
        ),
    )


def notify_inquiry_submission(inquiry_id: int, payload: InquiryCreate) -> None:
    send_email(
        subject=f"New Lubis inquiry #{inquiry_id} - {payload.source}",
        reply_to=payload.email,
        body="\n".join(
            [
                "A new inquiry was submitted on a Lubis website.",
                "",
                f"Inquiry ID: {inquiry_id}",
                f"Source: {payload.source}",
                f"Name: {payload.name}",
                f"Email: {payload.email}",
                f"Phone: {payload.phone or 'Not provided'}",
                f"Subject: {payload.subject or 'Not provided'}",
                "",
                "Message:",
                payload.message,
            ]
        ),
    )
