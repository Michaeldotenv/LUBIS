import httpx

from app.core.config import settings


async def upload_image_to_imgbb(image: str, name: str | None = None) -> dict:
    if not settings.imgbb_api_key:
        raise RuntimeError("IMAGEBB_API_KEY is not configured")

    data = {"key": settings.imgbb_api_key, "image": image}
    if name:
        data["name"] = name

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post("https://api.imgbb.com/1/upload", data=data)
        response.raise_for_status()
        return response.json()["data"]
