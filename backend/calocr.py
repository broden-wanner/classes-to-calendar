try:
    from PIL import Image
except ImportError:
    import Image

import pytesseract
import re
import json
from pytesseract import Output

DAYS_OF_WEEK = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']

def black_and_white_image(input_image_path, dithering=True):
    color_image = Image.open(input_image_path)
    if dithering:
        bw = color_image.convert('1')  
    else:
        bw = color_image.convert('1', dither=Image.NONE)
    return bw

class UMNClass:
    """
    A class to hold the data for each umn class

    Attributes
    ----------
    name : str
        the name of the class
    course_num : str
        course number of the class
    class_type : str
        the type of the class (choose from lecture, discussion, lab)
    location : str
        the hall and room number of the class
    start_time : str
        start time of the class
    end_time : str
        end time of the class
    days_of_week : str[]
        list of the days of the week the class is on
    """

    def __init__(self, **kwargs):
        self.name = kwargs.get('name')
        self.dept = kwargs.get('dept')
        self.course_num = kwargs.get('course_num')
        self.section = kwargs.get('section')
        self.location = kwargs.get('location')
        self.start_time = kwargs.get('start_time')
        self.end_time = kwargs.get('end_time')
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
               f'{self.start_time} - {self.end_time}\n' + \
               f'{self.days_of_week}\n'

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

    def toJSON(self):
        """
        Turns the class into a json object string
        """
        return json.dumps(self.__dict__)


def is_time(text):
    return re.match(r'^\d+:\d+$', text)

def is_room_num(text):
    room_regexes = [
        r'^\d{2,4}$',
        r'^\d-\d{3}$',
        r'^\w\d{2,}$'
    ]
    return any([re.match(regex, text) for regex in room_regexes])

def ocr_png_to_str_list(path):
    # Change the image to black and white
    img = black_and_white_image(path, False)
    # Extract the data frame of the image with tesseract
    df = pytesseract.image_to_data(img, output_type=Output.DATAFRAME)
    # Remove rows with null entries in text
    df = df.dropna()
    # Change to list of strings
    return [s for s in df['text'].tolist() if not s.isspace()]

def generate_umn_classes(img_path):
    # Get the list of strings from the image
    text = ocr_png_to_str_list(img_path)
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
        c.location += ' ' + text[i] # Add the room number to the end
            
        # Add the class to the set. If it's already in the set,
        # add this day of the week to the set on the class
        if c in classes:
            for existing_class in classes:
                if c == existing_class:
                    existing_class.days_of_week.append(cur_day_of_week)
                    break
        else:
            classes.add(c)

        i += 1

    # Return the set of classes
    return classes

if __name__ == '__main__':
    for c in generate_umn_classes('images/calendar.png'):
        print(c)
