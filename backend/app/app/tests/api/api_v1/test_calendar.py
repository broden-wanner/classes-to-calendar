from fastapi.testclient import TestClient

from app.core.config import settings
from app.tests.utils.utils import load_classes_true_json


def test_convert_umn_classes_to_calendar_event(client: TestClient) -> None:
    classes = load_classes_true_json("calendar.html")
    response = client.post(f"{settings.API_V1_STR}/calendar/events", json=classes)
    assert response.status_code == 200
    content = response.json()

    assert len(content) == len(classes)


def test_get_ics_string(client: TestClient) -> None:
    classes = load_classes_true_json("calendar.html")
    response = client.post(f"{settings.API_V1_STR}/calendar/ics", json=classes)
    assert response.status_code == 200
    content = response.json()

    assert "ics" in content


def test_get_google_config(client: TestClient) -> None:
    response = client.get(f"{settings.API_V1_STR}/calendar/google-config")
    assert response.status_code == 200
    content = response.json()

    assert "clientId" in content
    assert "apiKey" in content
    assert "scope" in content
    assert "discoveryDocs" in content
