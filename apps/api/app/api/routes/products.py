from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.db.session import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductRead

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=list[ProductRead])
def list_products(db: Session = Depends(get_db)) -> list[Product]:
    stmt = select(Product).options(selectinload(Product.variants), selectinload(Product.images)).where(Product.is_active.is_(True))
    return list(db.scalars(stmt).all())


@router.post("", response_model=ProductRead)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)) -> Product:
    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.get("/{slug}", response_model=ProductRead)
def get_product(slug: str, db: Session = Depends(get_db)) -> Product:
    stmt = select(Product).options(selectinload(Product.variants), selectinload(Product.images)).where(Product.slug == slug)
    product = db.scalar(stmt)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
