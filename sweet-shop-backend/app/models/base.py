# app/models/base.py
from sqlalchemy import Column, Integer, Boolean
from app.core.database import Base

class BaseModel(Base):
    __abstract__ = True
    
    id = Column(Integer, primary_key=True, index=True)
    is_active = Column(Boolean, default=True)
