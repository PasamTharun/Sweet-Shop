# app/tests/test_crud/test_user.py
import pytest
from app.crud.user import create_user, authenticate_user, get_user_by_email
from app.schemas.user import UserCreate

def test_create_user(db):
    user_data = UserCreate(email="test@example.com", password="testpass123")
    user = create_user(db, user_data)
    assert user.email == "test@example.com"
    assert user.hashed_password != "testpass123"

def test_authenticate_user(db):
    user_data = UserCreate(email="auth@test.com", password="password123")
    create_user(db, user_data)
    user = authenticate_user(db, "auth@test.com", "password123")
    assert user.email == "auth@test.com"
