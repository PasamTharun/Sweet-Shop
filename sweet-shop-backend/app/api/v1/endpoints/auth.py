# app/api/v1/endpoints/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import create_access_token
from app.crud.user import create_user, authenticate_user
from app.schemas.user import UserCreate, Token
from app.api.deps import get_current_user
from app.models.user import User
from app.crud.user import get_user_by_email


router = APIRouter()

@router.post("/auth/register", response_model=Token)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user_in.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = create_user(db, user_in)
    access_token = create_access_token(subject=db_user.email)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(subject=user.email)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/auth/make-admin")
def make_admin(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    current_user.is_admin = True
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return {"email": current_user.email, "is_admin": current_user.is_admin}