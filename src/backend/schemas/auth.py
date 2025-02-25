from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None
    subscription_plan: Optional[str] = None
    preferences: Optional[dict] = None

class UserResponse(UserBase):
    id: str
    subscription_plan: str = "free"
    preferences: Optional[dict] = None
    is_active: bool = True
    is_superuser: bool = False

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None 