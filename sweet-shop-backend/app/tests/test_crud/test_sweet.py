# app/tests/test_crud/test_sweet.py
import pytest
from fastapi import HTTPException
from app.crud.sweet import create_sweet, purchase_sweet, get_sweets
from app.schemas.sweet import SweetCreate

def test_create_sweet(db):
    sweet_data = SweetCreate(name="Test Chocolate", category="Chocolate", price=2.99, quantity=10)
    sweet = create_sweet(db, sweet_data)
    assert sweet.name == "Test Chocolate"
    assert sweet.quantity == 10

def test_purchase_sweet_success(db):
    sweet = create_sweet(db, SweetCreate(name="Gummy", category="Candy", price=1.49, quantity=5))
    result = purchase_sweet(db, sweet.id, 2)
    assert result.quantity == 3

def test_purchase_insufficient_stock(db):
    sweet = create_sweet(db, SweetCreate(name="Out", category="Candy", price=1.0, quantity=0))
    with pytest.raises(HTTPException):
        purchase_sweet(db, sweet.id, 1)
