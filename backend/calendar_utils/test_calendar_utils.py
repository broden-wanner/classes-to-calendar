import pytest
import pickle
import datetime
from .ocr import generate_umn_classes
from . import models 
import sys
try:
    from PIL import Image
except ImportError:
    import Image

# Set the modules needed to unpickle
sys.modules['models'] = models

class TestCalendarUtils:

    def check_calendar(self, name):
        f = open(f'calendar_utils/true-classes-output/{name}.p', 'rb')
        true_classes = pickle.load(f)

        results = generate_umn_classes(img=Image.open(f'calendar_utils/test-images/{name}.png'),
                                       start_date=datetime.date(year=2020, month=1, day=21),
                                       end_date=datetime.date(year=2020, month=5, day=4))
        classes = results['classes']
        assert results['extracted_all'] == True
        assert len(true_classes) == len(classes)
        for i in range(len(true_classes)):
            assert true_classes[i] in classes

    def test_regular_calendar_parsing(self):
        self.check_calendar('calendar')

    def test_calendar_parsing_with_no_class_day_beginning(self):
        self.check_calendar('no-class-calendar')

    def test_calendar_parsing_with_no_class_day_end(self):
        self.check_calendar('no-classes-end')

    def test_calendar_parsing_with_tba(self):
        self.check_calendar('tba-calendar')

    def test_calendar_with_odd_room_number(self):
        self.check_calendar('calendar4')