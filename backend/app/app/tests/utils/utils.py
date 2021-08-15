import json
from io import TextIOWrapper

from app.core.config import settings
from app.schemas import UMNClass


def load_class_html_str(file: str) -> str:
    test_html = f"{settings.BASE_DIR}/tests/resources/test-html/{file}"
    with open(test_html, "r+") as f:
        html_string = f.read()
    return html_string


def load_class_html_file(file: str) -> TextIOWrapper:
    test_html = f"{settings.BASE_DIR}/tests/resources/test-html/{file}"
    return open(test_html, "r+")


def load_classes_true_json(file: str) -> list[UMNClass]:
    true_output_file = (
        f"{settings.BASE_DIR}/tests/resources/true-classes-output/{file}.json"
    )
    with open(true_output_file, "r") as f:
        true_output = json.load(f)
    return true_output
