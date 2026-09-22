from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.imgbb import upload_image_to_imgbb

router = APIRouter(prefix="/media", tags=["media"])


class ImageUploadRequest(BaseModel):
    image: str
    name: str | None = None


@router.post("/imgbb/upload")
async def upload_to_imgbb(payload: ImageUploadRequest) -> dict:
    try:
        data = await upload_image_to_imgbb(payload.image, payload.name)
    except RuntimeError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    return {
        "url": data.get("url"),
        "display_url": data.get("display_url"),
        "delete_url": data.get("delete_url"),
    }
