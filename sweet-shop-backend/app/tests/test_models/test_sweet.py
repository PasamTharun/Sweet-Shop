# app/tests/test_models/test_sweet.py
from app.models.sweet import Sweet

def test_sweet_model():
    sweet = Sweet(name="Test Sweet", price=5.0, category="Test")
    assert sweet.name == "Test Sweet"