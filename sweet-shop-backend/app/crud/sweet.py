# app/crud/sweet.py
from sqlalchemy.orm import Session
from typing import Optional
from sqlalchemy import and_
from sqlalchemy import or_
from fastapi import HTTPException

from app.models.sweet import Sweet as SweetModel    
from app.models.sweet import Sweet # ORM model
from app.schemas.sweet import SweetCreate, SweetUpdate# Pydantic schemas


def get_sweets(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
):
    query = db.query(Sweet)

    # only active sweets, if your model has this column
    if hasattr(Sweet, "is_active"):
        query = query.filter(Sweet.is_active == True)

    if category:
        query = query.filter(Sweet.category.ilike(category))

    if min_price is not None:
        query = query.filter(Sweet.price >= min_price)
    if max_price is not None:
        query = query.filter(Sweet.price <= max_price)

    return query.offset(skip).limit(limit).all()


def create_sweet(db: Session, sweet_in: SweetCreate) -> Sweet:
    db_sweet = Sweet(**sweet_in.model_dump())
    db.add(db_sweet)
    db.commit()
    db.refresh(db_sweet)
    return db_sweet  # ✅ return ORM object


from sqlalchemy.orm import Session
from app.models.sweet import Sweet

def get_sweet(db: Session, sweet_id: int) -> Sweet | None:
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    return sweet  # ✅ return ORM instance directly



def update_sweet(db: Session, sweet_id: int, sweet_in: SweetUpdate) -> Sweet | None:
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        return None
    data = sweet_in.model_dump(exclude_unset=True)
    for field, value in data.items():
        setattr(sweet, field, value)
    db.add(sweet)
    db.commit()
    db.refresh(sweet)
    return sweet  # ✅


def delete_sweet(db: Session, sweet_id: int):
    sweet = db.query(SweetModel).filter(SweetModel.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    sweet.is_active = False   # if this column exists; otherwise remove this line
    db.commit()

def purchase_sweet(db: Session, sweet_id: int, quantity: int) -> SweetModel:
    sweet = db.query(SweetModel).filter(SweetModel.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    if sweet.quantity < quantity:
        raise HTTPException(status_code=400, detail="Insufficient stock")

    sweet.quantity -= quantity
    db.commit()
    db.refresh(sweet)
    return sweet


def restock_sweet(db: Session, sweet_id: int, quantity: int) -> Sweet:
    sweet = db.query(SweetModel).filter(SweetModel.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    sweet.quantity += quantity
    db.commit()
    db.refresh(sweet)
    return Sweet.model_validate(sweet)
