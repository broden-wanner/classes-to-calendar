import datetime
import os
import secrets
from typing import Any, Union

from dotenv import load_dotenv
from pydantic import AnyHttpUrl, BaseModel, BaseSettings, EmailStr, validator

# Load dotenv environment variables
load_dotenv()


class Contact(BaseModel):
    url: AnyHttpUrl = "https://brodenwanner.com"
    name: str = "Broden Wanner"
    email: EmailStr = "brodenwanner@gmail.com"


class Settings(BaseSettings):
    PROJECT_NAME: str
    VERSION: str
    CONTACT: Contact = Contact()

    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    BACKEND_CORS_ORIGINS: list[AnyHttpUrl]
    BASE_DIR: str = os.path.dirname(os.path.dirname(__file__))

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, list[str]]) -> Union[list[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Custom app settings
    DEFAULT_CLASS_START_DATE: datetime.date = datetime.date(year=2021, month=9, day=7)
    DEFAULT_CLASS_END_DATE: datetime.date = datetime.date(year=2021, month=12, day=15)

    # Google config info
    GOOGLE_CLIENT_ID: str
    GOOGLE_CALENDAR_API_KEY: str
    GOOGLE_SCOPE: str = "https://www.googleapis.com/auth/calendar"
    GOOGLE_DISCOVERY_DOCS: list[str] = [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]

    # Logging
    LOGGING_CONFIG: dict[str, Any] = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "detailed": {
                "class": "logging.Formatter",
                "format": "[%(asctime)s] %(levelname)s %(name)-15s: %(message)s",
            }
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "detailed",
                "level": "DEBUG",
            },
        },
        "loggers": {
            "app.main": {"handlers": ["console"]},
            "app.api.api_v1.endpoints.upload": {"handlers": ["console"]},
            "app.calendar.html_parser": {"handlers": ["console"]},
        },
    }

    class Config:
        case_sensitive = True


settings = Settings()
