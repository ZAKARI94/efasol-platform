"""Backend tests for EFASOL contact API endpoints."""
import os
import time
import pytest
import requests

def _resolve_base_url() -> str:
    # Prefer explicit test/backend vars; fallback to frontend var for compatibility.
    for key in ("BACKEND_TEST_URL", "BACKEND_URL", "REACT_APP_BACKEND_URL"):
        value = os.environ.get(key)
        if value:
            return value.rstrip("/")

    # Try frontend env files in common container layouts.
    for env_path in (
        "/workspaces/efasol-platform/frontend/.env",
        "/app/frontend/.env",
    ):
        try:
            with open(env_path, encoding="utf-8") as f:
                for line in f:
                    if line.startswith("REACT_APP_BACKEND_URL="):
                        return line.split("=", 1)[1].strip().rstrip("/")
        except FileNotFoundError:
            continue

    # Local dev default.
    return "http://localhost:8000"


BASE_URL = _resolve_base_url()

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health / root ---
class TestHealth:
    def test_api_root(self, api_client):
        r = api_client.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


# --- Contact CRUD ---
class TestContact:
    def test_create_contact_message(self, api_client):
        payload = {
            "name": "TEST_John Doe",
            "email": "TEST_john@example.com",
            "phone": "+225070000000",
            "message": "TEST_ Automated pytest submission",
        }
        r = api_client.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        # store id for later
        pytest.contact_id = data["id"]

    def test_list_returns_newest_first_and_contains_created(self, api_client):
        # sleep a moment to ensure any indexing settles
        time.sleep(0.5)
        r = api_client.get(f"{API}/contact", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        # newest first sort assertion
        if len(data) >= 2:
            assert data[0]["created_at"] >= data[1]["created_at"]
        # our created message must be present
        assert any(m.get("id") == getattr(pytest, "contact_id", None) for m in data)

    def test_create_without_phone_defaults_to_empty(self, api_client):
        payload = {
            "name": "TEST_NoPhone",
            "email": "TEST_nophone@example.com",
            "message": "TEST_ no phone field",
        }
        r = api_client.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["phone"] == ""

    def test_create_missing_required_field_returns_422(self, api_client):
        payload = {"email": "TEST_@example.com", "message": "missing name"}
        r = api_client.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_no_mongo_object_id_leaks(self, api_client):
        r = api_client.get(f"{API}/contact", timeout=15)
        assert r.status_code == 200
        for m in r.json():
            assert "_id" not in m
