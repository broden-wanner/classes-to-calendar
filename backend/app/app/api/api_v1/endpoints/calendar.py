import json

from fastapi import APIRouter

from app import models, schemas
from app.calendar_utils.ics import to_ics_string
from app.core.config import settings

router = APIRouter()


@router.post("/events", response_model=list[schemas.CalendarEvent])
def events_endpoint(classes: list[schemas.UMNClass]):
    """
    Accepts classes in the requests and casts them to gcal event format
    """
    # Put the days of of the week back into an array
    classes_processed = [json.loads(c.json()) for c in classes]
    for c in classes_processed:
        c["days_of_week"] = c["days_of_week"].split(", ")
    class_events = [models.UMNClass(**c).to_event_dict() for c in classes_processed]
    return class_events


@router.post("/ics", response_model=schemas.ICSExport)
def ics_endpoint(classes: list[schemas.UMNClass]):
    """
    Accepts classes in the request and returns an ics string with all
    the events
    """
    # Put the days of of the week back into an array
    classes_processed = [json.loads(c.json()) for c in classes]
    for c in classes_processed:
        c["days_of_week"] = c["days_of_week"].split(", ")
    classes = [models.UMNClass(**c) for c in classes_processed]
    return {"ics": to_ics_string(classes)}


@router.get("/google-config", response_model=schemas.GoogleConfig)
def google_config_endpoint():
    """
    Sends the google calendar api config to the frontend
    """
    return {
        "clientId": settings.GOOGLE_CLIENT_ID,
        "apiKey": settings.GOOGLE_CALENDAR_API_KEY,
        "scope": settings.GOOGLE_SCOPE,
        "discoveryDocs": settings.GOOGLE_DISCOVERY_DOCS,
    }
