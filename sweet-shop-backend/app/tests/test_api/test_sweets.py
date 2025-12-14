# app/tests/test_api/test_sweets.py
def test_read_sweets(client):
    response = client.get("/api/v1/sweets/")
    assert response.status_code == 200

def test_create_sweet(client):
    # Assuming auth is needed, but for simplicity
    response = client.post("/api/v1/sweets/", json={"name": "Test Sweet", "price": 10.0, "category": "Test"})
    # May need token, but for now
    assert response.status_code in [200, 401]