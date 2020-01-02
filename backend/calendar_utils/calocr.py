try:
    from PIL import Image
except ImportError:
    import Image

import pytesseract
import re
import json
import datetime
from pytesseract import Output

DAYS_OF_WEEK = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
WEEKDAY_DICT = {
    'MONDAY': 0,
    'TUESDAY': 1,
    'WEDNESDAY': 2,
    'THURSDAY': 3,
    'FRIDAY': 4,
    'SATURDAY': 5,
    'SUNDAY': 6
}


class UMNClass:
    """
    A class to hold the data for each umn class. Can be serialized to a gcal event dicationary.
    """

    def __init__(self, **kwargs):
        self.name = kwargs.get('name')
        self.dept = kwargs.get('dept')
        self.course_num = kwargs.get('course_num')
        self.section = kwargs.get('section')
        self.location = kwargs.get('location')
        self.start_time = kwargs.get('start_time')
        self.end_time = kwargs.get('end_time')
        self.start_date = kwargs.get('start_date')
        self.end_date = kwargs.get('end_date')
        if kwargs.get('days_of_week'):
            self.days_of_week = kwargs.get('days_of_week')
        else:
            self.days_of_week = []

    def __str__(self):
        """
        Create a string representation of the class
        """
        return f'{self.name}\n' + \
               f'{self.dept} {self.course_num} {self.section}\n' + \
               f'{self.location}\n' + \
               f'{self.start_time.strftime("%I:%M %p")} - {self.end_time.strftime("%I:%M %p")}\n' + \
               f'{self.start_date} - {self.end_date}\n' + \
               f'Days: {", ".join(self.days_of_week)}\n'

    def __repr__(self):
        """
        Override the unique representation for the class
        """
        return f'{{{self.dept} {self.course_num} {self.section}}}'

    def __eq__(self, other):
        """
        Custom equality override for set comparators
        """
        return self.dept == other.dept and self.course_num == other.course_num and self.section == other.section

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

        self.end_time = datetime.datetime.strptime(
            self.end_time, '%I:%M%p')
        self.start_time = datetime.datetime.strptime(
            self.start_time + am_or_pm, '%I:%M%p')

        # Special case when class start time is am and end time is pm
        if am_or_pm == 'PM' and self.start_time > self.end_time:
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

    def serialize(self):
        """
        Turns the class into a serializable dictionary for json conversion
        """
        return {
            'name': self.name,
            'dept': self.dept,
            'course_num': self.course_num,
            'section': self.section,
            'location': self.location,
            'start_time': self.start_time.isoformat(),
            'end_time': self.end_time.isoformat(),
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'days_of_week': ", ".join(self.days_of_week)
        }

    def to_gcal_event(self):
        """
        Turns the class into a recurring gcal event dictionary as specified by
        the google calendar api
        """
        start = datetime.datetime.combine(self.start_date, self.start_time)
        end = datetime.datetime.combine(self.start_date, self.end_time)

        # Setup recurrence
        r_days = ','.join([day[:2] for day in self.days_of_week])
        r_end = datetime.datetime.combine(
            self.end_date + datetime.timedelta(days=1), self.end_time).isoformat()
        r_end = re.compile(r'[-:]').sub('', r_end) + 'Z'
        recurrence = f'RRULE:FREQ=WEEKLY;BYDAY={r_days};UNTIL={r_end}'

        # Make the event dictionary
        event = {
            'summary': self.name,
            'location': self.location,
            'description': f'{self.dept} {self.course_num} ({self.section})',
            'start': {
                'dateTime': start.isoformat(),
                'timeZone': 'America/Chicago'
            },
            'end': {
                'dateTime': end.isoformat(),
                'timeZone': 'America/Chicago'

            },
            'recurrence': [recurrence]
        }
        return event


def is_time(text):
    """ Helper function that returns a boolean of whether a string is a time """
    return re.match(r'^\d+:\d+$', text)


def is_room_num(text):
    """ Helper functiont to determine if the string is a room number at the U """
    room_regexes = [
        r'^\d{2,4}$',
        r'^\d-\d{3}$',
        r'^\w\d{2,}$'
    ]
    return any([re.match(regex, text) for regex in room_regexes])


def black_and_white_image(input_image, dithering=True):
    """ Helper function to change an image to black and white without saving """
    if dithering:
        bw = input_image.convert('1')
    else:
        bw = input_image.convert('1', dither=Image.NONE)
    return bw


def ocr_png_to_str_list(input_image):
    """
    Uses pytesseract to scan an image with ocr and extract the calendar information.
    Changes the extracted strings into a list and returns it.
    The image must be converted to black and white in order to get all text.
    """
    # Change the image to black and white
    input_image = black_and_white_image(input_image, False)
    # Extract the data frame of the image with tesseract
    df = pytesseract.image_to_data(input_image, output_type=Output.DATAFRAME)
    # Remove rows with null entries in text
    df = df.dropna()
    # Change to list of strings
    return [s for s in df['text'].tolist() if not s.isspace()]


def generate_umn_classes(img, start_date=None, end_date=None):
    """
    Calls the ocr function on the image specified by img and gets the
    extracted text. Then parses the list of strings to form the classes on the
    calendar. Returns a list of all the extracted classes in the UMNClass object.
    """
    # Get the list of strings from the image
    text = ocr_png_to_str_list(img)
    c = None
    cur_day_of_week = ''
    classes = set()
    i = 0
    length = len(text)

    while i < length:
        # Get the day of the week
        if text[i] in DAYS_OF_WEEK:
            cur_day_of_week = text[i]
            i += 1

        # Start a new class
        c = UMNClass()
        c.days_of_week.append(cur_day_of_week)

        # Department code
        c.dept = text[i]
        i += 1
        # Course number
        c.course_num = text[i]
        i += 1
        # Section number
        c.section = re.search(r'^\((\d{3})\)$', text[i]).group(1)
        i += 1

        # Name of the class
        c.name = text[i]
        i += 1
        # Add strings until the start time of the class is reached
        while (not is_time(text[i])):
            c.name += ' ' + text[i]
            i += 1

        # Start time
        c.start_time = text[i]
        i += 2

        # End time
        c.end_time = text[i]
        i += 1
        c.end_time += text[i]
        i += 1

        # Location
        c.location = text[i]
        i += 1
        while i < length - 1 and not is_room_num(text[i]):
            c.location += ' ' + text[i]
            i += 1
        c.location += ' ' + text[i]  # Add the room number to the end

        # Add the class to the set. If it's already in the set,
        # add this day of the week to the set on the class
        if c in classes:
            for existing_class in classes:
                if c == existing_class:
                    existing_class.days_of_week.append(cur_day_of_week)
                    break
        else:
            c.set_times()  # Set the times to datetime objects
            classes.add(c)

        i += 1

    if start_date and end_date:
        # Must be done after all the class days have been assigned
        for c in classes:
            # Specify the dates of the class
            c.set_class_dates(start_date=start_date, end_date=end_date)

    # Return the set of classes as a list
    return list(classes)


if __name__ == '__main__':
    classes = generate_umn_classes(img=Image.open('example-images/calendar.png'),
                                   start_date=datetime.date(year=2020, month=1, day=21),
                                   end_date=datetime.date(year=2020, month=5, day=4))
    for c in classes:
        print(c)
