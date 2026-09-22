from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.contact import Inquiry
from app.models.order import Order
from app.models.product import Product
from app.models.property import Property

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/summary")
def admin_summary(db: Session = Depends(get_db)) -> dict[str, int]:
    return {
        "products": db.scalar(select(func.count(Product.id))) or 0,
        "properties": db.scalar(select(func.count(Property.id))) or 0,
        "orders": db.scalar(select(func.count(Order.id))) or 0,
        "inquiries": db.scalar(select(func.count(Inquiry.id))) or 0,
    }
