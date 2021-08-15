from fastapi.testclient import TestClient

from app.core.config import settings
from app.tests.utils.utils import load_class_html_file, load_classes_true_json


def test_upload_myu_html_no_file(client: TestClient) -> None:
    response = client.post(f"{settings.API_V1_STR}/upload/myu-calendar")
    assert response.status_code == 422
    content = response.json()["detail"]

    assert all("calendar_html" in error["loc"] for error in content)
    assert all(error["type"] == "value_error.missing" for error in content)


def test_upload_myu_html_no_dates(client: TestClient) -> None:
    # Read in calendar and upload
    calendar_name = "calendar.html"
    with load_class_html_file(calendar_name) as f:
        response = client.post(
            f"{settings.API_V1_STR}/upload/myu-calendar",
            files={"calendar_html": ("calendar.html", f, "text/html")},
        )
    assert response.status_code == 200
    content = response.json()
    assert content["extracted_all"]
    output_classes = content["classes"]

    # Get the true output
    true_output = load_classes_true_json(calendar_name)

    # Ensure outputs are the same
    assert len(output_classes) == len(true_output)
    for c in true_output:
        assert c in output_classes


def test_upload_myu_html_with_dates(client: TestClient) -> None:
    # Read in calendar and upload
    calendar_name = "calendar.html"
    with load_class_html_file(calendar_name) as f:
        response = client.post(
            f"{settings.API_V1_STR}/upload/myu-calendar",
            files={"calendar_html": ("calendar.html", f, "text/html")},
            data={
                "class_start_date_str": settings.DEFAULT_CLASS_START_DATE.isoformat(),
                "class_end_date_str": settings.DEFAULT_CLASS_END_DATE.isoformat(),
            },
        )
    assert response.status_code == 200
    content = response.json()
    assert content["extracted_all"]
    output_classes = content["classes"]

    # Get the true output
    true_output = load_classes_true_json(calendar_name)

    # Ensure outputs are the same
    assert len(output_classes) == len(true_output)
    for c in true_output:
        assert c in output_classes
