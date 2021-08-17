from app.calendar_utils.html_parser import parse_umn_classes_from_myu_html
from app.core.config import settings
from app.tests.utils.utils import load_class_html_str, load_classes_true_json


def test_calendar_html() -> None:
    """Test to ensure calendar HTML is returned as expected"""
    html_files = [
        "calendar.htm",
        "calendar.html",
        "no-class-day.html",
        "fall2020calendar.html",
        "spring2021calendar.html",
        "partial-calendar.html",
    ]
    for file in html_files:
        html_string = load_class_html_str(file)

        results = parse_umn_classes_from_myu_html(
            html_string=html_string,
            start_date=settings.DEFAULT_CLASS_START_DATE,
            end_date=settings.DEFAULT_CLASS_END_DATE,
        )
        classes = results["classes"]

        # Get the true output
        true_output = load_classes_true_json(file)

        assert results["extracted_all"]
        assert len(true_output) == len(classes)
        for i in range(len(true_output)):
            assert true_output[i] in classes
