from pydantic import BaseModel
from typing import Optional
from pydantic import ConfigDict 

class SweetBase(BaseModel):
    name: str
    category: str
    price: float
    quantity: int

class SweetCreate(SweetBase):
    pass

class SweetUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    
class Sweet(SweetBase):
    id: Optional[int] = None
    
    model_config = ConfigDict(from_attributes=True)
    
class SweetResponse(Sweet):
    pass