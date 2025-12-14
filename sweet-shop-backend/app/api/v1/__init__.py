# app/api/v1/__init__.py
from fastapi import APIRouter
from .endpoints import auth, sweets

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(sweets.router, prefix="", tags=["sweets"])
