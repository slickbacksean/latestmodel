from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import Any, List, Optional
from datetime import datetime
from sqlalchemy import or_

from models.database import get_db
from models.models import Newsletter, User
from models.schemas import NewsletterCreate, NewsletterResponse, NewsletterUpdate
from utils.auth import get_current_active_user, get_current_superuser
from services.email import send_newsletter_email

router = APIRouter(
    prefix="/newsletters",
    tags=["newsletters"]
)

@router.get("/", response_model=List[NewsletterResponse])
async def list_newsletters(
    *,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    search: Optional[str] = None,
) -> Any:
    """
    Retrieve newsletters with filtering options.
    """
    query = db.query(Newsletter)
    
    if category:
        query = query.filter(Newsletter.category == category)
    
    if search:
        search_filter = or_(
            Newsletter.title.ilike(f"%{search}%"),
            Newsletter.description.ilike(f"%{search}%"),
            Newsletter.author.ilike(f"%{search}%"),
        )
        query = query.filter(search_filter)
    
    total = query.count()
    newsletters = query.offset(skip).limit(limit).all()
    
    return newsletters

@router.post("/", response_model=NewsletterResponse)
async def create_newsletter(
    *,
    db: Session = Depends(get_db),
    newsletter_in: NewsletterCreate,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Create new newsletter. Only for superusers.
    """
    newsletter = Newsletter(**newsletter_in.dict())
    db.add(newsletter)
    db.commit()
    db.refresh(newsletter)
    return newsletter

@router.get("/{newsletter_id}", response_model=NewsletterResponse)
async def get_newsletter(
    *,
    db: Session = Depends(get_db),
    newsletter_id: str,
) -> Any:
    """
    Get newsletter by ID.
    """
    newsletter = db.query(Newsletter).filter(Newsletter.id == newsletter_id).first()
    if not newsletter:
        raise HTTPException(
            status_code=404,
            detail="Newsletter not found",
        )
    return newsletter

@router.put("/{newsletter_id}", response_model=NewsletterResponse)
async def update_newsletter(
    *,
    db: Session = Depends(get_db),
    newsletter_id: str,
    newsletter_in: NewsletterUpdate,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Update newsletter. Only for superusers.
    """
    newsletter = db.query(Newsletter).filter(Newsletter.id == newsletter_id).first()
    if not newsletter:
        raise HTTPException(
            status_code=404,
            detail="Newsletter not found",
        )
    
    for field, value in newsletter_in.dict(exclude_unset=True).items():
        setattr(newsletter, field, value)
    
    db.add(newsletter)
    db.commit()
    db.refresh(newsletter)
    return newsletter

@router.delete("/{newsletter_id}", response_model=NewsletterResponse)
async def delete_newsletter(
    *,
    db: Session = Depends(get_db),
    newsletter_id: str,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Delete newsletter. Only for superusers.
    """
    newsletter = db.query(Newsletter).filter(Newsletter.id == newsletter_id).first()
    if not newsletter:
        raise HTTPException(
            status_code=404,
            detail="Newsletter not found",
        )
    db.delete(newsletter)
    db.commit()
    return newsletter

@router.post("/{newsletter_id}/send")
async def send_newsletter(
    newsletter_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_superuser)
):
    """
    Send a newsletter that hasn't been sent yet. Only accessible to superusers.
    """
    newsletter = db.query(Newsletter).filter(Newsletter.id == newsletter_id).first()
    if not newsletter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Newsletter not found"
        )
    
    if newsletter.sent_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Newsletter has already been sent"
        )
    
    newsletter.sent_at = datetime.utcnow()
    
    # Add email sending task to background tasks
    background_tasks.add_task(
        send_newsletter_email,
        newsletter.subject,
        newsletter.content
    )
    
    db.commit()
    return {"message": "Newsletter sending started"} 