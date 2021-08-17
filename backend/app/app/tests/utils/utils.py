import json
from typing import Any, Dict, List, TextIO

from app.core.config import settings


def load_class_html_str(file: str) -> str:
    test_html = f"{settings.BASE_DIR}/tests/resources/test-html/{file}"
    with open(test_html, "r+") as f:
        html_string = f.read()
    return html_string


def load_class_html_file(file: str) -> TextIO:
    test_html = f"{settings.BASE_DIR}/tests/resources/test-html/{file}"
    return open(test_html, "r+")


def load_classes_true_json(file: str) -> List[Dict[str, Any]]:
    true_output_file = (
        f"{settings.BASE_DIR}/tests/resources/true-classes-output/{file}.json"
    )
    with open(true_output_file, "r") as f:
        true_output = json.load(f)
    return true_output
