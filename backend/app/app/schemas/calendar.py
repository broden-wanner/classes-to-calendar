from datetime import datetime
from typing import List

from pydantic import BaseModel


class CalendarTime(BaseModel):
    dateTime: datetime
    timeZone: str


class CalendarEvent(BaseModel):
    summary: str
    location: str
    description: str
    start: CalendarTime
    end: CalendarTime
    recurrence: List[str]


class ICSExport(BaseModel):
    ics: str
