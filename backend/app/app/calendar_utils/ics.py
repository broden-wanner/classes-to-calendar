from app.models import UMNClass


def to_ics_string(
    classes: list[UMNClass],
    calendar_name="Class Calendar",
    timezone="America/Chicago",
    description="",
) -> str:
    """
    Converts the classes to icalendar-compliant events and adds them
    to a calendar, whose information can be specified in the
    keyword arguments.
    """
    calendar = [
        "BEGIN:VCALENDAR\n",
        "PRODID:-//Classes to Calendar Inc//Classes to Calendar 1.0//EN\n"
        "VERSION:2.0\n",
        "CALSCALE:GREGORIAN\n",
        "METHOD:PUBLISH\n",
        f"X-WR-CALNAME:{calendar_name}\n",
        f"X-WR-TIMEZONE:{timezone}\n",
        f"X-WR-CALDESC:{description}\n",
        "BEGIN:VTIMEZONE\n",
        f"TZID:{timezone}\n",
        f"X-LIC-LOCATION:{timezone}\n",
        "BEGIN:DAYLIGHT\n",
        "TZOFFSETFROM:-0600\n",
        "TZOFFSETTO:-0500\n",
        "TZNAME:CDT\n",
        "DTSTART:19700308T020000\n",
        "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\n",
        "END:DAYLIGHT\n",
        "BEGIN:STANDARD\n",
        "TZOFFSETFROM:-0500\n",
        "TZOFFSETTO:-0600\n",
        "TZNAME:CST\n",
        "DTSTART:19701101T020000\n",
        "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\n",
        "END:STANDARD\n",
        "END:VTIMEZONE\n",
    ]
    events = [c.to_ics_event_string() for c in classes]
    footer = "END:VCALENDAR"
    content = "".join(calendar) + "".join(events) + footer
    content = content.replace(r"\n", "\r\n")  # Put crlf line endings
    return content
