import sys
import pytest
import pickle
import datetime
from classestocalendar.umncalendar.html_parser import generate_umn_classes_from_html
from classestocalendar.umncalendar import models 

# Set the modules needed to unpickle
sys.modules['models'] = models

class TestHTMLParserUtils:

    def check_calendar(self, name):
        f = open(f'tests/true-classes-html-output/{name}.p', 'rb')
        true_classes = pickle.load(f)

        with open(f'tests/test-html/{name}.html', 'r+') as f:
            html_string = f.read()
        start_date=datetime.date(year=2020, month=1, day=21)
        end_date=datetime.date(year=2020, month=5, day=4)

        results = generate_umn_classes_from_html(html_string=html_string, start_date=start_date, end_date=end_date)
        classes = results['classes']

        assert results['extracted_all'] == True
        assert len(true_classes) == len(classes)
        for i in range(len(true_classes)):
            assert true_classes[i] in classes

    def test_regular_calendar_parsing(self):
        self.check_calendar('calendar')

    def test_no_class_day_calendar(self):
        self.check_calendar('no-class-day')