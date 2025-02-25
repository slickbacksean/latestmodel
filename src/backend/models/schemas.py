from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserUpdate(BaseModel):
    subscription_plan: Optional[str] = None
    preferences: Optional[Dict[str, Any]] = None

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_superuser: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# AI Model schemas
class AIModelBase(BaseModel):
    id: str
    name: str
    creator: Optional[str] = None
    source: str
    category: str
    description: Optional[str] = None
    huggingface_url: Optional[str] = None
    replicate_url: Optional[str] = None
    benchmark_metrics: Optional[Dict[str, Any]] = None
    tags: Optional[List[str]] = None
    last_updated: Optional[datetime] = None
    downloads: Optional[int] = None
    likes: Optional[int] = None
    model_type: Optional[str] = None
    papers: Optional[List[Dict[str, Any]]] = None
    spaces: Optional[List[Dict[str, Any]]] = None
    model_tree: Optional[Dict[str, Any]] = None
    technical_details: Optional[Dict[str, Any]] = None
    citation: Optional[str] = None
    pipeline_tag: Optional[str] = None
    mask_token: Optional[str] = None
    widget_data: Optional[Dict[str, Any]] = None
    config: Optional[Dict[str, Any]] = None
    card_data: Optional[Dict[str, Any]] = None
    discussion_count: Optional[int] = None
    pull_requests: Optional[List[Dict[str, Any]]] = None
    gated: Optional[bool] = None
    private: Optional[bool] = None
    siblings: Optional[List[Dict[str, Any]]] = None
    tasks: Optional[List[Dict[str, Any]]] = None
    files: Optional[List[Dict[str, Any]]] = None
    model_index: Optional[Dict[str, Any]] = None
    available_libraries: Optional[List[str]] = None

class AIModelCreate(AIModelBase):
    pass

class AIModelUpdate(BaseModel):
    name: Optional[str] = None
    creator: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    benchmark_metrics: Optional[Dict[str, Any]] = None
    tags: Optional[List[str]] = None
    model_type: Optional[str] = None

class AIModelResponse(AIModelBase):
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# AI Tool schemas
class AIToolBase(BaseModel):
    name: str
    category: str
    description: str
    pricing: Dict[str, Any]
    url: str

class AIToolCreate(AIToolBase):
    pass

class AIToolUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    pricing: Optional[Dict[str, Any]] = None
    trending_score: Optional[float] = None

class AIToolResponse(AIToolBase):
    id: str
    trending_score: float
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Tutorial schemas
class TutorialBase(BaseModel):
    title: str
    description: Optional[str] = None
    content: str
    category: str
    author: Optional[str] = None
    url: str

class TutorialCreate(TutorialBase):
    pass

class TutorialUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    url: Optional[str] = None

class TutorialResponse(TutorialBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Newsletter schemas
class NewsletterBase(BaseModel):
    subject: str
    content: str

class NewsletterCreate(NewsletterBase):
    pass

class NewsletterUpdate(BaseModel):
    subject: Optional[str] = None
    content: Optional[str] = None
    metrics: Optional[Dict[str, Any]] = None

class NewsletterResponse(NewsletterBase):
    id: str
    sent_at: Optional[datetime] = None
    created_at: datetime
    metrics: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True

# Subscription schemas
class SubscriptionBase(BaseModel):
    plan: str
    payment_method: Dict[str, Any]

class SubscriptionCreate(SubscriptionBase):
    user_id: str

class SubscriptionUpdate(BaseModel):
    status: Optional[str] = None
    end_date: Optional[datetime] = None
    payment_status: Optional[str] = None

class SubscriptionResponse(SubscriptionBase):
    id: str
    user_id: str
    status: str
    start_date: datetime
    end_date: Optional[datetime] = None
    payment_status: str

    class Config:
        from_attributes = True

# Token schemas
class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None

# Tool schemas
class ToolBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    creator: Optional[str] = None
    url: str

class ToolCreate(ToolBase):
    pass

class ToolUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    creator: Optional[str] = None
    url: Optional[str] = None

class ToolResponse(ToolBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 