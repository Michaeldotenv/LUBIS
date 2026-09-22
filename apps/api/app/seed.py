import base64
import hashlib
import os

from app.db.base import Base
from app.db.session import engine, SessionLocal
from app.models.admin import Admin
from app.models.product import Product, ProductImage, ProductVariant
from app.models.property import Property


def hash_password(password: str) -> str:
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 240_000)
    return "pbkdf2_sha256$240000${}${}".format(
        base64.b64encode(salt).decode("ascii"),
        base64.b64encode(digest).decode("ascii"),
    )


def run() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if not db.query(Product).first():
            blazer = Product(
                slug="tailored-everyday-blazer",
                name="Tailored Everyday Blazer",
                description="A structured blazer made for office days, dinner plans, and polished everyday wear.",
                category="Outerwear",
                price=48500,
            )
            blazer.variants = [
                ProductVariant(size="S", color="Black", stock=5),
                ProductVariant(size="M", color="Black", stock=8),
                ProductVariant(size="L", color="Navy", stock=5),
            ]
            blazer.images = [ProductImage(url="/brand/lubis-hero.png", alt="Tailored Everyday Blazer", sort_order=0)]
            db.add(blazer)

        if not db.query(Property).first():
            db.add(
                Property(
                    slug="ikoyi-waterfront-apartments",
                    title="Ikoyi Waterfront Apartments",
                    location="Ikoyi, Lagos",
                    property_type="Luxury apartments",
                    price_label="From NGN 180M",
                    description="Modern apartments with managed facilities, water views, and flexible investment options.",
                    features=["Waterfront outlook", "Gym and pool", "24-hour power", "Concierge"],
                )
            )

        if not db.query(Admin).first():
            db.add(Admin(email="admin@lubis.org", hashed_password=hash_password("change-this-password")))

        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    run()
