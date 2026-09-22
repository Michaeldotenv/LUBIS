from pydantic import BaseModel


class ProductVariantRead(BaseModel):
    id: int
    size: str
    color: str
    stock: int

    model_config = {"from_attributes": True}


class ProductImageRead(BaseModel):
    id: int
    url: str
    alt: str
    sort_order: int

    model_config = {"from_attributes": True}


class ProductCreate(BaseModel):
    slug: str
    name: str
    description: str
    category: str
    price: int


class ProductRead(ProductCreate):
    id: int
    is_active: bool
    variants: list[ProductVariantRead] = []
    images: list[ProductImageRead] = []

    model_config = {"from_attributes": True}
