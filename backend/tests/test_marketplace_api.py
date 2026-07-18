"""Backend tests for EFASOL marketplace (products/orders) API endpoints."""
import os
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


class TestProducts:
    def test_list_products_returns_seeded_catalog(self, api_client):
        r = api_client.get(f"{API}/products", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 7
        ids = {p["id"] for p in data}
        assert "whole-chicken-15" in ids
        assert "gizzard" in ids

    def test_get_single_product(self, api_client):
        r = api_client.get(f"{API}/products/whole-chicken-15", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["id"] == "whole-chicken-15"
        assert data["price"] == 3750
        assert "stock" in data

    def test_get_unknown_product_returns_404(self, api_client):
        r = api_client.get(f"{API}/products/does-not-exist", timeout=15)
        assert r.status_code == 404

    def test_no_mongo_object_id_leaks(self, api_client):
        r = api_client.get(f"{API}/products", timeout=15)
        for p in r.json():
            assert "_id" not in p


class TestOrders:
    def test_create_order_computes_totals_server_side(self, api_client):
        before = api_client.get(f"{API}/products/chicken-wings", timeout=15).json()
        payload = {
            "customer": {"name": "TEST_Order User", "phone": "TEST_0700000000", "address": "TEST_Rue 1", "city": "TEST_Abidjan"},
            "items": [{"id": "chicken-wings", "quantity": 2}],
            "delivery_method": "express",
            "payment_method": "cash",
        }
        r = api_client.post(f"{API}/orders", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["subtotal"] == before["price"] * 2
        assert data["delivery_price"] == 2000
        assert data["total"] == data["subtotal"] + 2000
        assert data["items"][0]["id"] == "chicken-wings"
        assert data["items"][0]["quantity"] == 2
        assert data["order_number"].startswith("EF-")
        assert "id" in data and "created_at" in data
        pytest.order_id = data["id"]

        after = api_client.get(f"{API}/products/chicken-wings", timeout=15).json()
        assert after["stock"] == before["stock"] - 2

    def test_get_created_order(self, api_client):
        order_id = getattr(pytest, "order_id", None)
        assert order_id
        r = api_client.get(f"{API}/orders/{order_id}", timeout=15)
        assert r.status_code == 200
        assert r.json()["id"] == order_id

    def test_list_orders_contains_created_order(self, api_client):
        order_id = getattr(pytest, "order_id", None)
        r = api_client.get(f"{API}/orders", timeout=15)
        assert r.status_code == 200
        assert any(o["id"] == order_id for o in r.json())

    def test_create_order_unknown_product_returns_404(self, api_client):
        payload = {
            "customer": {"name": "TEST_User", "phone": "TEST_0700", "address": "TEST_Addr"},
            "items": [{"id": "does-not-exist", "quantity": 1}],
            "delivery_method": "standard",
            "payment_method": "cash",
        }
        r = api_client.post(f"{API}/orders", json=payload, timeout=15)
        assert r.status_code == 404

    def test_create_order_insufficient_stock_returns_409(self, api_client):
        payload = {
            "customer": {"name": "TEST_User", "phone": "TEST_0700", "address": "TEST_Addr"},
            "items": [{"id": "gizzard", "quantity": 100000}],
            "delivery_method": "standard",
            "payment_method": "cash",
        }
        r = api_client.post(f"{API}/orders", json=payload, timeout=15)
        assert r.status_code == 409

    def test_create_order_missing_customer_returns_422(self, api_client):
        payload = {"items": [{"id": "gizzard", "quantity": 1}]}
        r = api_client.post(f"{API}/orders", json=payload, timeout=15)
        assert r.status_code == 422

    def test_create_order_zero_quantity_returns_422(self, api_client):
        payload = {
            "customer": {"name": "TEST_User", "phone": "TEST_0700", "address": "TEST_Addr"},
            "items": [{"id": "gizzard", "quantity": 0}],
            "delivery_method": "standard",
            "payment_method": "cash",
        }
        r = api_client.post(f"{API}/orders", json=payload, timeout=15)
        assert r.status_code == 422


class TestAdmin:
    @staticmethod
    def _login(api_client):
        payload = {"email": "admin@efasol.ci", "password": "admin123"}
        r = api_client.post(f"{API}/admin/login", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        token = r.json().get("access_token")
        assert token
        return token

    def test_admin_login_invalid_credentials(self, api_client):
        payload = {"email": "admin@efasol.ci", "password": "wrong-password"}
        r = api_client.post(f"{API}/admin/login", json=payload, timeout=15)
        assert r.status_code == 401

    def test_admin_products_requires_auth(self, api_client):
        r = api_client.get(f"{API}/admin/products", timeout=15)
        assert r.status_code == 401

    def test_admin_product_crud(self, api_client):
        token = self._login(api_client)
        headers = {"Authorization": f"Bearer {token}"}

        create_payload = {
            "id": "admin-test-product",
            "name": "Admin Test Product",
            "category": "cuts",
            "price": 1234,
            "weight": "300 g",
            "stock": 7,
            "promo": False,
            "featured": False,
            "image": "https://example.com/product.jpg",
        }

        # ensure clean state
        api_client.delete(f"{API}/admin/products/admin-test-product", headers=headers, timeout=15)

        r = api_client.post(f"{API}/admin/products", json=create_payload, headers=headers, timeout=15)
        assert r.status_code == 200, r.text
        assert r.json()["id"] == "admin-test-product"

        r = api_client.put(
            f"{API}/admin/products/admin-test-product",
            json={"stock": 9, "promo": True},
            headers=headers,
            timeout=15,
        )
        assert r.status_code == 200, r.text
        assert r.json()["stock"] == 9
        assert r.json()["promo"] is True

        r = api_client.delete(f"{API}/admin/products/admin-test-product", headers=headers, timeout=15)
        assert r.status_code == 200, r.text
        assert r.json().get("ok") is True

    def test_admin_order_status_and_export(self, api_client):
        token = self._login(api_client)
        headers = {"Authorization": f"Bearer {token}"}

        # create an order to update
        order_payload = {
            "customer": {"name": "TEST_Admin", "phone": "TEST_0700", "address": "TEST_Addr", "city": "TEST_City"},
            "items": [{"id": "gizzard", "quantity": 1}],
            "delivery_method": "standard",
            "payment_method": "cash",
        }
        order_resp = api_client.post(f"{API}/orders", json=order_payload, timeout=15)
        assert order_resp.status_code == 200, order_resp.text
        order_id = order_resp.json()["id"]

        r = api_client.patch(
            f"{API}/admin/orders/{order_id}/status",
            json={"status": "processing"},
            headers=headers,
            timeout=15,
        )
        assert r.status_code == 200, r.text
        assert r.json()["status"] == "processing"

        r = api_client.get(f"{API}/admin/orders", headers=headers, timeout=15)
        assert r.status_code == 200, r.text
        assert isinstance(r.json(), list)
        assert any(o["id"] == order_id for o in r.json())

        r = api_client.get(f"{API}/admin/orders/export.csv", headers=headers, timeout=15)
        assert r.status_code == 200, r.text
        assert "order_number,status" in r.text

    def test_admin_token_refresh_rotates_session(self, api_client):
        token = self._login(api_client)
        old_headers = {"Authorization": f"Bearer {token}"}

        refresh = api_client.post(f"{API}/admin/token/refresh", headers=old_headers, timeout=15)
        assert refresh.status_code == 200, refresh.text
        new_token = refresh.json().get("access_token")
        assert new_token and new_token != token

        # old token should be invalidated after rotation
        old_access = api_client.get(f"{API}/admin/products", headers=old_headers, timeout=15)
        assert old_access.status_code == 401

        # new token should work
        new_headers = {"Authorization": f"Bearer {new_token}"}
        new_access = api_client.get(f"{API}/admin/products", headers=new_headers, timeout=15)
        assert new_access.status_code == 200
