from fastapi import APIRouter

from app.api.api_v1.endpoints import calendar, upload

api_router = APIRouter()
api_router.include_router(upload.router, prefix="/upload", tags=["upload"])
api_router.include_router(calendar.router, prefix="/calendar", tags=["calendar"])
