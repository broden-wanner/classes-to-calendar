import datetime
import re
import uuid

from app.schemas.calendar import CalendarEvent
from app.schemas.umn_class import UMNClass as UMNClassSchema

DAYS_OF_WEEK = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]
WEEKDAY_DICT = {
    "MONDAY": 0,
    "TUESDAY": 1,
    "WEDNESDAY": 2,
    "THURSDAY": 3,
    "FRIDAY": 4,
    "SATURDAY": 5,
    "SUNDAY": 6,
}


class UMNClass:
    """
    A class to hold the data for each umn class. Can be serialized to a gcal event
    dictionary.
    """

    def __init__(self, **kwargs):
        self.name = kwargs.get("name")
        self.dept = kwargs.get("dept")
        self.course_num = kwargs.get("course_num")
        self.section = kwargs.get("section")
        self.location = kwargs.get("location")

        self.start_time = kwargs.get("start_time")
        if isinstance(self.start_time, str):
            self.start_time = datetime.datetime.strptime(
                self.start_time, "%H:%M:%S"
            ).time()

        self.end_time = kwargs.get("end_time")
        if isinstance(self.end_time, str):
            self.end_time = datetime.datetime.strptime(self.end_time, "%H:%M:%S").time()

        self.start_date = kwargs.get("start_date")
        if isinstance(self.start_date, str):
            self.start_date = datetime.datetime.strptime(
                self.start_date, "%Y-%m-%d"
            ).date()

        self.end_date = kwargs.get("end_date")
        if isinstance(self.end_date, str):
            self.end_date = datetime.datetime.strptime(self.end_date, "%Y-%m-%d").date()

        if kwargs.get("days_of_week"):
            self.days_of_week = kwargs.get("days_of_week")
        else:
            self.days_of_week = []

    def __str__(self):
        """
        Create a string representation of the class
        """
        time_start = self.start_time.strftime("%I:%M %p")
        time_end = self.end_time.strftime("%I:%M %p")
        return (
            f"{self.name}\n"
            + f"{self.dept} {self.course_num} {self.section}\n"
            + f"{self.location}\n"
            + f"{time_start} - {time_end}\n"
            + f"{self.start_date} - {self.end_date}\n"
            + f'Days: {", ".join(self.days_of_week)}\n'
        )

    def __repr__(self):
        """
        Override the unique representation for the class
        """
        return f"{{{self.dept} {self.course_num} {self.section}}}"

    def __eq__(self, other):
        """
        Custom equality override for set comparators
        """
        return (
            self.dept == other.dept
            and self.course_num == other.course_num
            and self.section == other.section
        )

    def __hash__(self):
        """
        Custom hash method for membership comparison for sets
        """
        return hash(self.dept + self.course_num + self.section)

    def set_times(self):
        """
        Convert all the string times into datetime.time objects
        """
        am_or_pm = self.end_time[-2:]

        self.end_time = datetime.datetime.strptime(self.end_time, "%I:%M%p")
        self.start_time = datetime.datetime.strptime(
            self.start_time + am_or_pm, "%I:%M%p"
        )

        # Special case when class start time is am and end time is pm
        if am_or_pm == "PM" and self.start_time > self.end_time:
            self.start_time = self.start_time - datetime.timedelta(hours=12)

        self.start_time = self.start_time.time()
        self.end_time = self.end_time.time()

        assert self.start_time < self.end_time

    def set_class_dates(self, start_date, end_date):
        """
        Assigns the dates on the class. End date will not be adjusted since google
        calendar handles the offset issues.
        """
        assert isinstance(start_date, datetime.date)
        assert isinstance(end_date, datetime.date)

        start_weekday = start_date.weekday()
        first_weekday = WEEKDAY_DICT[self.days_of_week[0]]
        # See if any of the other days of the week are on the first week
        for day in self.days_of_week:
            if WEEKDAY_DICT[day] >= start_weekday:
                first_weekday = WEEKDAY_DICT[day]
                break
        if first_weekday >= start_weekday:
            offset = first_weekday - start_weekday
        else:
            offset = first_weekday - start_weekday + 7

        self.start_date = start_date + datetime.timedelta(days=offset)
        # Set every class on this end date because gcal will handle the offset
        self.end_date = end_date

    def serialize(self) -> UMNClassSchema:
        """
        Turns the class into a serializable dictionary for json conversion. Generates a
        unique id based on the department, course number, and section
        """
        return {
            "id": f"{self.dept}{self.course_num}{self.section}",
            "name": self.name,
            "dept": self.dept,
            "course_num": self.course_num,
            "section": self.section,
            "location": self.location,
            "start_time": self.start_time.isoformat(),
            "end_time": self.end_time.isoformat(),
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat(),
            "days_of_week": ", ".join(self.days_of_week),
        }

    def to_event_dict(self) -> CalendarEvent:
        """
        Turns the class into a recurring gcal event dictionary as specified by
        the google calendar api. This is a json format conforming to the
        icalendar specification.
        """
        start = datetime.datetime.combine(self.start_date, self.start_time)
        end = datetime.datetime.combine(self.start_date, self.end_time)

        # Setup recurrence
        r_days = ",".join([day[:2] for day in self.days_of_week])
        r_end = datetime.datetime.combine(
            self.end_date + datetime.timedelta(days=1), self.end_time
        ).isoformat()
        r_end = re.compile(r"[-:]").sub("", r_end) + "Z"
        recurrence = f"RRULE:FREQ=WEEKLY;BYDAY={r_days};UNTIL={r_end}"

        # Make the event dictionary
        event = {
            "summary": self.name,
            "location": self.location,
            "description": f"{self.dept} {self.course_num} ({self.section})",
            "start": {"dateTime": start.isoformat(), "timeZone": "America/Chicago"},
            "end": {"dateTime": end.isoformat(), "timeZone": "America/Chicago"},
            "recurrence": [recurrence],
        }
        return event

    def to_ics_event_string(self) -> str:
        """
        Converts the class into a string in the icalendar format to be written to an
        ics file:

        BEGIN:VEVENT
        DTSTAMP: *now*
        DTSTART;TZID=America/Chicago:*start time*
        DTEND;TZID=America/Chicago:*end time*
        RRULE:*recurrence rule*
        UID:*uuid*
        DESCRIPTION:*description*
        LOCATION:*location*
        SEQUENCE:0
        STATUS:CONFIRMED
        SUMMARY:*summary*
        TRANSP:OPAQUE
        END:VEVENT
        """
        data = self.to_event_dict()
        start = (
            data["start"]["dateTime"].replace("-", "").replace(":", "").replace(" ", "")
        )
        end = data["end"]["dateTime"].replace("-", "").replace(":", "").replace(" ", "")
        return (
            "BEGIN:VEVENT\n"
            + f'DTSTAMP:{datetime.datetime.now().strftime("%Y%m%dT%H%M%S")}Z\n'
            + f'DTSTART;TZID={data["start"]["timeZone"]}:{start}\n'
            + f'DTEND;TZID={data["end"]["timeZone"]}:{end}\n'
            + f'RRULE:{data["recurrence"][0][6:]}\n'
            + f"UID:{uuid.uuid4()}\n"
            + f'DESCRIPTION:{data["description"]}\n'
            + f'LOCATION:{data["location"]}\n'
            + "SEQUENCE:0\n"
            + "STATUS:CONFIRMED\n"
            + f'SUMMARY:{data["summary"]}\n'
            + "TRANSP:OPAQUE\n"
            + "END:VEVENT\n"
        )
