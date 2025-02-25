from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, JSON, Float, Table, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base
import uuid
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    subscription_plan = Column(String, default="free")
    preferences = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

    # Relationships
    tutorials = relationship("Tutorial", back_populates="author")
    subscriptions = relationship("Subscription", back_populates="user")

class AIModel(Base):
    __tablename__ = "ai_models"

    id = Column(String, primary_key=True)
    name = Column(String, index=True)
    creator = Column(String, index=True)
    source = Column(String)  # 'huggingface' or 'replicate'
    category = Column(String, index=True)
    description = Column(String)
    huggingface_url = Column(String)
    replicate_url = Column(String)
    benchmark_metrics = Column(JSON)
    tags = Column(JSON)  # Array of strings
    last_updated = Column(DateTime(timezone=True))
    downloads = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    model_type = Column(String)  # 'downloadable' or 'api'
    
    # Enhanced metadata
    papers = Column(JSON)  # Array of paper objects
    spaces = Column(JSON)  # Array of space objects
    model_tree = Column(JSON)  # Tree structure object
    technical_details = Column(JSON)  # Technical specifications
    citation = Column(String)
    
    # Additional metadata
    pipeline_tag = Column(String)
    mask_token = Column(String)
    widget_data = Column(JSON)
    config = Column(JSON)
    card_data = Column(JSON)
    
    # Community metrics
    discussion_count = Column(Integer, default=0)
    pull_requests = Column(JSON)  # Array of PR objects
    gated = Column(Boolean, default=False)
    private = Column(Boolean, default=False)
    siblings = Column(JSON)  # Array of sibling models
    tasks = Column(JSON)  # Array of task objects
    
    # Files and assets
    files = Column(JSON)  # Array of file objects
    model_index = Column(JSON)
    available_libraries = Column(JSON)  # Array of library names
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class AITool(Base):
    __tablename__ = "ai_tools"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True)
    category = Column(String)
    description = Column(String)
    pricing = Column(JSON)  # free, pro, enterprise pricing tiers
    url = Column(String)
    trending_score = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Tutorial(Base):
    __tablename__ = "tutorials"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    content = Column(Text)
    category = Column(String, index=True)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship
    author = relationship("User", back_populates="tutorials")

class Newsletter(Base):
    __tablename__ = "newsletters"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    subject = Column(String)
    content = Column(String)
    sent_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    metrics = Column(JSON)  # opens, clicks, etc.

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    plan = Column(String)  # free, pro, enterprise
    status = Column(String)  # active, cancelled, expired
    start_date = Column(DateTime(timezone=True), server_default=func.now())
    end_date = Column(DateTime(timezone=True))
    payment_status = Column(String)
    payment_method = Column(JSON)

    # Relationships
    user = relationship("User", back_populates="subscriptions")

class Tool(Base):
    __tablename__ = "tools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text, nullable=True)
    category = Column(String, index=True)
    creator = Column(String, nullable=True)
    url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow) 