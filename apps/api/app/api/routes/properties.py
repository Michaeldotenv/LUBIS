from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.property import Property
from app.schemas.property import PropertyCreate, PropertyRead

router = APIRouter(prefix="/properties", tags=["properties"])


@router.get("", response_model=list[PropertyRead])
def list_properties(db: Session = Depends(get_db)) -> list[Property]:
    return list(db.scalars(select(Property).where(Property.is_active.is_(True))).all())


@router.post("", response_model=PropertyRead)
def create_property(payload: PropertyCreate, db: Session = Depends(get_db)) -> Property:
    property_item = Property(**payload.model_dump())
    db.add(property_item)
    db.commit()
    db.refresh(property_item)
    return property_item


@router.get("/{slug}", response_model=PropertyRead)
def get_property(slug: str, db: Session = Depends(get_db)) -> Property:
    property_item = db.scalar(select(Property).where(Property.slug == slug))
    if not property_item:
        raise HTTPException(status_code=404, detail="Property not found")
    return property_item
