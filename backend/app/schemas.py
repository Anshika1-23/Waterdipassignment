# app/schemas.py
from pydantic import BaseModel
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    is_completed: Optional[bool] = False

class TaskUpdate(BaseModel):
    title: Optional[str]
    is_completed: Optional[bool]

class TaskResponse(BaseModel):
    id: int
    title: str
    is_completed: bool
