from logging.config import dictConfig

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.api_v1.api import api_router
from app.core.config import settings
from app.exceptions.handlers import parse_exception_handler
from app.exceptions.parser import ParseException

# Set up logging config
dictConfig(settings.LOGGING_CONFIG)

# Initialize the FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    version=settings.VERSION,
    contact={
        "url": settings.CONTACT.url,
        "name": settings.CONTACT.name,
        "email": settings.CONTACT.email,
    },
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Setup router and exception handlers
app.include_router(router=api_router, prefix=settings.API_V1_STR)
app.add_exception_handler(
    exc_class_or_status_code=ParseException, handler=parse_exception_handler
)
