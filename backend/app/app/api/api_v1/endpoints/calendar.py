from typing import Any, Dict, List

from fastapi import APIRouter

from app import models, schemas
from app.calendar_utils.ics import to_ics_string
from app.core.config import settings

router = APIRouter()


@router.post("/events", response_model=List[schemas.CalendarEvent])
def events_endpoint(classes: List[schemas.UMNClass]) -> List[Dict[str, Any]]:
    """
    Accepts classes in the requests and casts them to gcal event format
    """
    class_events = [
        models.UMNClass(
            name=c.name,
            dept=c.dept,
            course_num=c.course_num,
            section=c.section,
            location=c.location,
            start_time_str=c.start_time,
            end_time_str=c.end_time,
            start_date_str=c.start_date,
            end_date_str=c.end_date,
            days_of_week=c.days_of_week.split(", "),
        ).to_event_dict()
        for c in classes
    ]
    return class_events


@router.post("/ics", response_model=schemas.ICSExport)
def ics_endpoint(classes: List[schemas.UMNClass]) -> Dict[str, str]:
    """
    Accepts classes in the request and returns an ics string with all
    the events
    """
    classes_processed = [
        models.UMNClass(
            name=c.name,
            dept=c.dept,
            course_num=c.course_num,
            section=c.section,
            location=c.location,
            start_time_str=c.start_time,
            end_time_str=c.end_time,
            start_date_str=c.start_date,
            end_date_str=c.end_date,
            days_of_week=c.days_of_week.split(", "),
        )
        for c in classes
    ]
    return {"ics": to_ics_string(classes_processed)}


@router.get("/google-config", response_model=schemas.GoogleConfig)
def google_config_endpoint() -> Dict[str, Any]:
    """
    Sends the google calendar api config to the frontend
    """
    return {
        "clientId": settings.GOOGLE_CLIENT_ID,
        "apiKey": settings.GOOGLE_CALENDAR_API_KEY,
        "scope": settings.GOOGLE_SCOPE,
        "discoveryDocs": settings.GOOGLE_DISCOVERY_DOCS,
    }
