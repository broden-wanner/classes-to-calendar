import datetime

from app.calendar_utils.fetch_date import fetch_current_term_from_api
from app.core.config import settings
from app.tests.utils.utils import load_class_html_str, load_classes_true_json


def test_fetch_current_term_from_api() -> None:
    """Test to ensure this function could fetch the date properly instead of default value"""
    results = fetch_current_term_from_api()

    today = datetime.date.today()

    assert results["extracted_date"]
    assert results["start_date"] != today and results["end_date"] != today + datetime.timedelta(weeks=15)
    assert settings.DEFAULT_CLASS_START_DATE == results["start_date"]
    assert settings.DEFAULT_CLASS_END_DATE == results["end_date"]