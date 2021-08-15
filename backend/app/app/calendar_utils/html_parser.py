import datetime
import logging
import re

from bs4 import BeautifulSoup

from app.models.umn_class import UMNClass
from app.schemas.umn_class import ClassesResponse

logger = logging.getLogger(__name__)


def parse_umn_classes_from_myu_html(
    html_string: str, start_date: datetime.datetime, end_date: datetime.datetime
) -> ClassesResponse:
    """Creates a list of UMNClass objects gathered from the html string

    Args:
        html_string (str): The HTML of the page with the calendar
        start_date (datetime.datetime): Start date for the classes
        end_date (datetime.datetime): End date for the classes

    Returns:
        ClassesResponse: Dictionary containing the list of UMNClass objects and other
                         information
    """
    soup = BeautifulSoup(html_string, "html.parser")
    calendar = soup.find("div", {"class": "myu_calendar"})
    days = calendar.find_all("div", {"class": "myu_calendar-day"})
    class_set: set[UMNClass] = set()

    try:
        # Iterate through each da found in the calendar
        for day in days:
            day_name = day["data-day"].upper()
            classes = day.find_all("a", {"class": "myu_calendar-class"})

            # Iterate through all classes on the day
            for class_ in classes:
                c = UMNClass()
                c.days_of_week.append(day_name)

                name_and_section = class_.find(
                    "span", {"class", "myu_calendar-class-name"}, recursive=False
                )
                name_and_section_list = name_and_section.contents[1].split()
                c.section = name_and_section_list.pop(0)
                if c.section.startswith("("):
                    c.section = c.section[1:]
                if c.section.endswith(")"):
                    c.section = c.section[:-1]
                c.name = " ".join(name_and_section_list)

                dept_and_num = class_.find(
                    "span", {"class": "myu_calendar-class-name-color-referencer"}
                )
                dept_and_num_list = dept_and_num.text.split()
                c.dept = dept_and_num_list[0]
                c.course_num = dept_and_num_list[1]

                details = class_.find("span", {"class": "myu_calendar-class-details"})

                # Extract the details for the name
                c.name += " " + details.contents[0]

                # Check to see if the next item is the time
                if re.match(r"\d{1,2}:\d{2}", details.contents[2].strip()):
                    times = details.contents[2].split()
                else:
                    times = details.contents[4].split()

                c.start_time = times[0]
                c.end_time = times[2] + times[3]
                c.location = details.contents[4].strip()

                # Check to see if the class has already been added
                if c not in class_set:
                    c.set_times()
                    class_set.add(c)
                else:
                    # Add the day of the week to the class if it is already in the set
                    for existing_class in class_set:
                        if c == existing_class:
                            existing_class.days_of_week.append(day_name)
                            break
    except Exception as e:
        # Change each class into a json serializeable dictionary
        class_list = list(class_set)
        class_list.sort(key=lambda c: c.name)
        class_list = [c.serialize() for c in class_list]
        logger.error(f"Could not extract all classes: {e}")
        return {
            "classes": class_list,
            "extracted_all": False,
            "message": f"Could not get all classes: {e}",
        }

    # Assign dates to the classes
    # Must be done after all the class days have been assigned
    for c in class_set:
        c.set_class_dates(start_date=start_date, end_date=end_date)

    # Change each class into a json serializeable dictionary
    class_list = list(class_set)
    class_list.sort(key=lambda c: c.name)
    class_list = [c.serialize() for c in class_list]
    return {
        "classes": class_list,
        "extracted_all": True,
        "message": "Successfully extracted classes",
    }
