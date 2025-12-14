# app/api/v1/endpoints/sweets.py
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from typing import List
from app.core.database import get_db
from app.models.sweet import Sweet
from app.api.deps import get_current_active_user, get_current_admin_user
from app.crud.sweet import (
    get_sweets, create_sweet, get_sweet, update_sweet, delete_sweet,
    purchase_sweet, restock_sweet
)
from app.models.user import User
from app.schemas.sweet import SweetCreate, SweetResponse, SweetUpdate

router = APIRouter()

@router.get("/sweets", response_model=List[SweetResponse])
def read_all_sweets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    # no filters: all sweets
    sweets = get_sweets(db)
    return sweets

@router.get("/sweets/search", response_model=List[SweetResponse])
def search_sweets(
    category: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    sweets = get_sweets(
        db,
        skip=skip,
        limit=limit,
        category=category,
        min_price=min_price,
        max_price=max_price,
    )
    return sweets

@router.get("/sweets/{sweet_id}", response_model=SweetResponse)
def read_sweet(
    sweet_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    sweet = get_sweet(db, sweet_id)
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return sweet

@router.post("/sweets", response_model=SweetResponse)
def create_sweet_endpoint(
    sweet_in: SweetCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    return create_sweet(db, sweet_in)


@router.put("/sweets/{sweet_id}", response_model=SweetResponse)
def update_sweet_endpoint(
    sweet_id: int,
    sweet_in: SweetUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    return update_sweet(db, sweet_id, sweet_in)

@router.delete("/sweets/{sweet_id}")
def delete_sweet_endpoint(
    sweet_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    delete_sweet(db, sweet_id)
    return {"message": "Sweet deleted successfully"}

@router.post("/sweets/purchase")
def purchase_sweet_flexible(
    sweet_id: Optional[int] = Query(
        None, description="Sweet ID to purchase (optional if name is provided)"
    ),
    name: Optional[str] = Query(
        None, description="Sweet name to purchase (optional if id is provided)"
    ),
    max_price: Optional[float] = Query(
        None, ge=0, description="Optional max price user is willing to pay"
    ),
    quantity: int = Query(1, ge=1),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    # Must supply at least id or name
    if sweet_id is None and not name:
        raise HTTPException(
            status_code=400,
            detail="You must provide either sweet_id or name",
        )

    query = db.query(Sweet)

    if sweet_id is not None:
        query = query.filter(Sweet.id == sweet_id)

    if name:
        # if both id and name given, both conditions apply
        query = query.filter(Sweet.name.ilike(name))

    if max_price is not None:
        query = query.filter(Sweet.price <= max_price)

    sweet = query.first()
    if not sweet:
        raise HTTPException(
            status_code=404,
            detail="Sweet not found matching given criteria",
        )

    if sweet.quantity < quantity:
        raise HTTPException(
            status_code=400,
            detail="Not enough stock available",
        )

    sweet.quantity -= quantity
    db.add(sweet)
    db.commit()
    db.refresh(sweet)

    return {
        "message": f"Purchased {quantity} units of {sweet.name}",
        "price_per_unit": sweet.price,
        "total_price": sweet.price * quantity,
        "remaining_stock": sweet.quantity,
    }
@router.post("/sweets/{sweet_id}/restock")
def restock_sweet_endpoint(
    sweet_id: int,
    quantity: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    sweet = restock_sweet(db, sweet_id, quantity)
    return {"message": f"Restocked {quantity} units", "new_stock": sweet.quantity}
