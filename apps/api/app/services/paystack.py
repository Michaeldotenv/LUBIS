import hashlib
import hmac
from uuid import uuid4

import httpx

from app.core.config import settings


def make_reference(order_id: int) -> str:
    return f"LUBIS-{order_id}-{uuid4().hex[:12].upper()}"


def verify_webhook_signature(raw_body: bytes, signature: str | None) -> bool:
    secret = settings.paystack_webhook_secret or settings.paystack_secret_key
    if not secret:
        return settings.environment == "development"
    if not signature:
        return False
    expected = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha512).hexdigest()
    return hmac.compare_digest(expected, signature)


async def initialize_transaction(email: str, amount_naira: int, reference: str) -> dict:
    if not settings.paystack_secret_key:
        return {
            "authorization_url": None,
            "access_code": None,
            "reference": reference,
            "message": "Paystack secret key is not configured; created a local payment reference.",
        }

    payload = {
        "email": email,
        "amount": amount_naira * 100,
        "reference": reference,
        "callback_url": settings.paystack_callback_url,
    }
    headers = {"Authorization": f"Bearer {settings.paystack_secret_key}"}
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.post("https://api.paystack.co/transaction/initialize", json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
    return data["data"]


async def verify_transaction(reference: str) -> dict:
    if not settings.paystack_secret_key:
        return {"reference": reference, "status": "success", "gateway_response": "Local development verification"}

    headers = {"Authorization": f"Bearer {settings.paystack_secret_key}"}
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.get(f"https://api.paystack.co/transaction/verify/{reference}", headers=headers)
        response.raise_for_status()
        data = response.json()
    return data["data"]
