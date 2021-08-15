from typing import Any

from pydantic import BaseModel


class UMNClassBase(BaseModel):
    id: str
    name: str
    dept: str
    course_num: str
    section: str
    location: str
    start_time: str
    end_time: str
    start_date: str
    end_date: str
    days_of_week: str


class UMNClass(UMNClassBase):
    pass


class ClassesResponseBase(BaseModel):
    extracted_all: bool
    classes: list[UMNClass]
    message: str


class ClassesResponse(ClassesResponseBase):
    pass
