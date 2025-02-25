from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import Any, List, Optional
from datetime import datetime, timedelta
from sqlalchemy import or_

from models.database import get_db
from models.models import Subscription, User
from models.schemas import SubscriptionCreate, SubscriptionResponse, SubscriptionUpdate
from utils.auth import get_current_active_user, get_current_superuser
from services.payment import process_payment, cancel_subscription
from services.email import send_subscription_confirmation_email

router = APIRouter(
    prefix="/subscriptions",
    tags=["subscriptions"]
)

@router.get("/", response_model=List[SubscriptionResponse])
async def list_subscriptions(
    *,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    search: Optional[str] = None,
) -> Any:
    """
    Retrieve subscriptions with filtering options.
    """
    query = db.query(Subscription)
    
    if status:
        query = query.filter(Subscription.status == status)
    
    if search:
        search_filter = or_(
            Subscription.plan.ilike(f"%{search}%"),
            Subscription.payment_status.ilike(f"%{search}%"),
        )
        query = query.filter(search_filter)
    
    total = query.count()
    subscriptions = query.offset(skip).limit(limit).all()
    
    return subscriptions

@router.get("/my", response_model=SubscriptionResponse)
async def get_my_subscription(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get the current user's subscription.
    """
    subscription = db.query(Subscription).filter(
        Subscription.user_id == current_user.id,
        Subscription.status == "active"
    ).first()
    
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active subscription found"
        )
    return subscription

@router.post("/", response_model=SubscriptionResponse)
async def create_subscription(
    *,
    db: Session = Depends(get_db),
    subscription_in: SubscriptionCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new subscription.
    """
    subscription = Subscription(**subscription_in.dict())
    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    return subscription

@router.get("/{subscription_id}", response_model=SubscriptionResponse)
async def get_subscription(
    *,
    db: Session = Depends(get_db),
    subscription_id: str,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get subscription by ID.
    """
    subscription = db.query(Subscription).filter(Subscription.id == subscription_id).first()
    if not subscription:
        raise HTTPException(
            status_code=404,
            detail="Subscription not found",
        )
    
    # Check if user owns the subscription or is superuser
    if subscription.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=403,
            detail="Not enough permissions",
        )
    
    return subscription

@router.put("/my", response_model=SubscriptionResponse)
async def update_my_subscription(
    subscription_update: SubscriptionUpdate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Update the current user's subscription.
    """
    subscription = db.query(Subscription).filter(
        Subscription.user_id == current_user.id,
        Subscription.status == "active"
    ).first()
    
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active subscription found"
        )
    
    # Process payment for plan upgrade if necessary
    if subscription_update.plan and subscription_update.plan != subscription.plan:
        try:
            payment_result = process_payment(
                amount=subscription_update.plan.price,
                payment_method=subscription.payment_method
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Payment processing failed: {str(e)}"
            )
        
        subscription.plan = subscription_update.plan
        current_user.subscription_plan = subscription_update.plan
    
    for key, value in subscription_update.dict(exclude_unset=True).items():
        if key != "plan":  # Plan is handled separately above
            setattr(subscription, key, value)
    
    db.commit()
    db.refresh(subscription)
    return subscription

@router.delete("/my")
async def cancel_my_subscription(
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Cancel the current user's subscription.
    """
    subscription = db.query(Subscription).filter(
        Subscription.user_id == current_user.id,
        Subscription.status == "active"
    ).first()
    
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active subscription found"
        )
    
    # Cancel subscription with payment provider
    try:
        cancel_subscription(subscription.id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to cancel subscription: {str(e)}"
        )
    
    subscription.status = "cancelled"
    current_user.subscription_plan = "free"
    
    db.commit()
    return {"message": "Subscription cancelled successfully"}

@router.put("/{subscription_id}", response_model=SubscriptionResponse)
async def update_subscription(
    *,
    db: Session = Depends(get_db),
    subscription_id: str,
    subscription_in: SubscriptionUpdate,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Update subscription. Only for superusers.
    """
    subscription = db.query(Subscription).filter(Subscription.id == subscription_id).first()
    if not subscription:
        raise HTTPException(
            status_code=404,
            detail="Subscription not found",
        )
    
    for field, value in subscription_in.dict(exclude_unset=True).items():
        setattr(subscription, field, value)
    
    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    return subscription

@router.delete("/{subscription_id}", response_model=SubscriptionResponse)
async def delete_subscription(
    *,
    db: Session = Depends(get_db),
    subscription_id: str,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Delete subscription. Only for superusers.
    """
    subscription = db.query(Subscription).filter(Subscription.id == subscription_id).first()
    if not subscription:
        raise HTTPException(
            status_code=404,
            detail="Subscription not found",
        )
    db.delete(subscription)
    db.commit()
    return subscription 