from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any, List, Optional
from sqlalchemy import or_

from models.database import get_db
from models.models import Tool, User
from models.schemas import ToolCreate, ToolResponse, ToolUpdate
from utils.auth import get_current_active_user, get_current_superuser

router = APIRouter(
    prefix="/tools",
    tags=["tools"]
)

@router.get("/", response_model=List[ToolResponse])
async def list_tools(
    *,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    search: Optional[str] = None,
) -> Any:
    """
    Retrieve tools with filtering options.
    """
    query = db.query(Tool)
    
    if category:
        query = query.filter(Tool.category == category)
    
    if search:
        search_filter = or_(
            Tool.name.ilike(f"%{search}%"),
            Tool.description.ilike(f"%{search}%"),
            Tool.creator.ilike(f"%{search}%"),
        )
        query = query.filter(search_filter)
    
    total = query.count()
    tools = query.offset(skip).limit(limit).all()
    
    return tools

@router.post("/", response_model=ToolResponse)
async def create_tool(
    *,
    db: Session = Depends(get_db),
    tool_in: ToolCreate,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Create new tool. Only for superusers.
    """
    tool = Tool(**tool_in.dict())
    db.add(tool)
    db.commit()
    db.refresh(tool)
    return tool

@router.get("/{tool_id}", response_model=ToolResponse)
async def get_tool(
    *,
    db: Session = Depends(get_db),
    tool_id: str,
) -> Any:
    """
    Get tool by ID.
    """
    tool = db.query(Tool).filter(Tool.id == tool_id).first()
    if not tool:
        raise HTTPException(
            status_code=404,
            detail="Tool not found",
        )
    return tool

@router.put("/{tool_id}", response_model=ToolResponse)
async def update_tool(
    *,
    db: Session = Depends(get_db),
    tool_id: str,
    tool_in: ToolUpdate,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Update tool. Only for superusers.
    """
    tool = db.query(Tool).filter(Tool.id == tool_id).first()
    if not tool:
        raise HTTPException(
            status_code=404,
            detail="Tool not found",
        )
    
    for field, value in tool_in.dict(exclude_unset=True).items():
        setattr(tool, field, value)
    
    db.add(tool)
    db.commit()
    db.refresh(tool)
    return tool

@router.delete("/{tool_id}", response_model=ToolResponse)
async def delete_tool(
    *,
    db: Session = Depends(get_db),
    tool_id: str,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Delete tool. Only for superusers.
    """
    tool = db.query(Tool).filter(Tool.id == tool_id).first()
    if not tool:
        raise HTTPException(
            status_code=404,
            detail="Tool not found",
        )
    db.delete(tool)
    db.commit()
    return tool 