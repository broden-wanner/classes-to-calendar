try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract
import re
import datetime
try:
    from .models import UMNClass, WEEKDAY_DICT, DAYS_OF_WEEK
except ModuleNotFoundError:
    from models import UMNClass, WEEKDAY_DICT, DAYS_OF_WEEK

class ParseError(Exception):
    """
    Class for error raised when parsing the text from the ocr reader
    """
    def __init__(self, message):
        self.message = str(message)
    
    def __str__(self):
        return self.message

    def to_dict(self):
        return {'message': self.message}


def is_time(text):
    """ Helper function that returns a boolean of whether a string is a time """
    return re.match(r'\d+:\d+', text)


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
    text = pytesseract.image_to_string(input_image, output_type=pytesseract.Output.STRING)
    # Replace newlines with spaces for the splitting
    text = text.replace('\n', ' ')
    # Return a list of the strings
    return text.split(' ')


def clean_text(text):
    """
    Cleans the text by splitting up the times by the hyphens in case
    the ocr groups them together.
    """
    assert len(text) > 0
    i = 0
    # Handle hyphens and 'AM' and 'PM' text
    while i < len(text):
        if not is_room_num(text[i]) and is_time(text[i]):
            strings = re.split(r'(-|AM|PM)', text[i])
            # Add the split strings to the list at that place
            text.pop(i)
            text[i:i] = strings
            i += len(strings)
        i += 1

    # Handle empty strings and 'No classes scheduled' text
    text = [s for s in text if s and s not in ['No', 'scheduled', 'classes']]

    return text

def generate_umn_classes(img, start_date=None, end_date=None):
    """
    Calls the ocr function on the image specified by img and gets the
    extracted text. Then parses the list of strings to form the classes on the
    calendar. Returns a list of all the extracted classes in the UMNClass object.

    Raises parse error if there is anything wrong.
    """
    # Get the list of strings from the image
    text = ocr_png_to_str_list(img)
    
    # Clean the text
    text = clean_text(text)
    print(text)

    c = None
    cur_day_of_week = ''
    classes = set()
    i = 0
    length = len(text)

    while i < length:
        # Get the day of the week
        while text[i] in DAYS_OF_WEEK:
            # Go to place where next text isn't a day of the week
            cur_day_of_week = text[i]
            i += 1
            if i >= len(text) - 1:
                break
        if i >= len(text) - 1:
            # Special case for if there are no classes at the end of the week
            break

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
        found = re.search(r'^\((\d{3})\)$', text[i])
        if not found:
            print(text[i])
            raise ParseError('No section found.')
        c.section = found.group(1)
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
    # Test
    classes = generate_umn_classes(img=Image.open('example-images/no-classes-end.png'),
                                   start_date=datetime.date(year=2020, month=1, day=21),
                                   end_date=datetime.date(year=2020, month=5, day=4))
    for c in classes:
        print(c)
