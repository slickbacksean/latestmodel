from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any, List, Optional
from sqlalchemy import or_

from models.database import get_db
from models.models import Tutorial, User
from models.schemas import TutorialCreate, TutorialResponse, TutorialUpdate
from utils.auth import get_current_active_user, get_current_superuser

router = APIRouter()

@router.get("/", response_model=List[TutorialResponse])
async def list_tutorials(
    *,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    search: Optional[str] = None,
) -> Any:
    """
    Retrieve tutorials with filtering options.
    """
    query = db.query(Tutorial)
    
    if category:
        query = query.filter(Tutorial.category == category)
    
    if search:
        search_filter = or_(
            Tutorial.title.ilike(f"%{search}%"),
            Tutorial.description.ilike(f"%{search}%"),
            Tutorial.author.ilike(f"%{search}%"),
        )
        query = query.filter(search_filter)
    
    total = query.count()
    tutorials = query.offset(skip).limit(limit).all()
    
    return tutorials

@router.post("/", response_model=TutorialResponse)
async def create_tutorial(
    *,
    db: Session = Depends(get_db),
    tutorial_in: TutorialCreate,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Create new tutorial. Only for superusers.
    """
    tutorial = Tutorial(**tutorial_in.dict())
    db.add(tutorial)
    db.commit()
    db.refresh(tutorial)
    return tutorial

@router.get("/{tutorial_id}", response_model=TutorialResponse)
async def get_tutorial(
    *,
    db: Session = Depends(get_db),
    tutorial_id: str,
) -> Any:
    """
    Get tutorial by ID.
    """
    tutorial = db.query(Tutorial).filter(Tutorial.id == tutorial_id).first()
    if not tutorial:
        raise HTTPException(
            status_code=404,
            detail="Tutorial not found",
        )
    return tutorial

@router.put("/{tutorial_id}", response_model=TutorialResponse)
async def update_tutorial(
    *,
    db: Session = Depends(get_db),
    tutorial_id: str,
    tutorial_in: TutorialUpdate,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Update tutorial. Only for superusers.
    """
    tutorial = db.query(Tutorial).filter(Tutorial.id == tutorial_id).first()
    if not tutorial:
        raise HTTPException(
            status_code=404,
            detail="Tutorial not found",
        )
    
    for field, value in tutorial_in.dict(exclude_unset=True).items():
        setattr(tutorial, field, value)
    
    db.add(tutorial)
    db.commit()
    db.refresh(tutorial)
    return tutorial

@router.delete("/{tutorial_id}", response_model=TutorialResponse)
async def delete_tutorial(
    *,
    db: Session = Depends(get_db),
    tutorial_id: str,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Delete tutorial. Only for superusers.
    """
    tutorial = db.query(Tutorial).filter(Tutorial.id == tutorial_id).first()
    if not tutorial:
        raise HTTPException(
            status_code=404,
            detail="Tutorial not found",
        )
    db.delete(tutorial)
    db.commit()
    return tutorial

@router.post("/{tutorial_id}/upvote")
async def upvote_tutorial(
    tutorial_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Upvote a tutorial.
    """
    tutorial = db.query(Tutorial).filter(Tutorial.id == tutorial_id).first()
    if not tutorial:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tutorial not found"
        )
    
    tutorial.upvotes += 1
    db.commit()
    return {"message": "Tutorial upvoted successfully"} 