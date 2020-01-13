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

    def test_regular_calendar_parsing(self):
        f = open('calendar_utils/true-classes-output/calendar.p', 'rb')
        true_classes = pickle.load(f)

        classes = generate_umn_classes(img=Image.open('calendar_utils/test-images/calendar.png'),
                                       start_date=datetime.date(year=2020, month=1, day=21),
                                       end_date=datetime.date(year=2020, month=5, day=4))

        assert len(true_classes) == len(classes)
        for i in range(len(true_classes)):
            assert true_classes[i] in classes

    def test_calendar_parsing_with_no_class_day_beginning(self):
        f = open('calendar_utils/true-classes-output/no-class-calendar.p', 'rb')
        true_classes = pickle.load(f)

        classes = generate_umn_classes(img=Image.open('calendar_utils/test-images/no-class-calendar.png'),
                                       start_date=datetime.date(year=2020, month=1, day=21),
                                       end_date=datetime.date(year=2020, month=5, day=4))

        assert len(true_classes) == len(classes)
        for i in range(len(true_classes)):
            assert true_classes[i] in classes


    def test_calendar_parsing_with_no_class_day_end(self):
        f = open('calendar_utils/true-classes-output/no-classes-end.p', 'rb')
        true_classes = pickle.load(f)

        classes = generate_umn_classes(img=Image.open('calendar_utils/test-images/no-classes-end.png'),
                                       start_date=datetime.date(year=2020, month=1, day=21),
                                       end_date=datetime.date(year=2020, month=5, day=4))

        assert len(true_classes) == len(classes)
        for i in range(len(true_classes)):
            assert true_classes[i] in classes