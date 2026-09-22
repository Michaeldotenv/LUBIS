from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

api_dir = Path(__file__).resolve().parents[2]
repo_root = Path(__file__).resolve().parents[4]


class Settings(BaseSettings):
    app_name: str = "Lubis API"
    environment: str = "development"
    database_url: str = "sqlite:///./lubis_dev.db"
    frontend_origins: str = "http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003"
    notification_email: str = "hello@lubis.org"
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_from_email: str = "hello@lubis.org"
    smtp_from_name: str = "Lubis Website"
    smtp_use_tls: bool = True
    paystack_secret_key: str = ""
    paystack_callback_url: str = "http://localhost:3003/order-confirmation"
    paystack_webhook_secret: str = Field(default="")
    imgbb_api_key: str = ""

    model_config = SettingsConfigDict(
        env_file=(repo_root / ".env", api_dir / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.frontend_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
