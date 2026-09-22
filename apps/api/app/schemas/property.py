from pydantic import BaseModel


class PropertyCreate(BaseModel):
    slug: str
    title: str
    location: str
    property_type: str
    price_label: str
    description: str
    features: list[str] = []


class PropertyRead(PropertyCreate):
    id: int
    is_active: bool

    model_config = {"from_attributes": True}
