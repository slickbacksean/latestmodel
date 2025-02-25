from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import Any, List, Optional, Dict
from sqlalchemy import or_
from urllib.parse import unquote
import traceback

from models.database import get_db
from models.models import AIModel, User
from models.schemas import AIModelCreate, AIModelResponse, AIModelUpdate
from utils.auth import get_current_active_user, get_current_superuser
from services.scraper import scrape_replicate_models, scrape_huggingface_models
from services.model_scraper import scrape_specific_model

router = APIRouter(prefix="/models", tags=["models"])

@router.get("/", response_model=List[AIModelResponse])
async def list_models(
    *,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    search: Optional[str] = None,
    access_level: Optional[str] = None,
) -> Any:
    """
    Retrieve AI models with filtering options.
    """
    query = db.query(AIModel)
    
    if category:
        query = query.filter(AIModel.category == category)
    
    if search:
        search_filter = or_(
            AIModel.name.ilike(f"%{search}%"),
            AIModel.description.ilike(f"%{search}%"),
            AIModel.creator.ilike(f"%{search}%"),
        )
        query = query.filter(search_filter)
    
    if access_level:
        query = query.filter(AIModel.access_level == access_level)
    
    total = query.count()
    models = query.offset(skip).limit(limit).all()
    
    return models

@router.get("/{model_id}")
async def get_model_detailed(
    model_id: str,
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """
    Get detailed information about a specific model.
    If not in database, scrapes it from Hugging Face.
    """
    try:
        print(f"Received request for model_id: {model_id}")
        
        # Decode the model ID
        decoded_model_id = unquote(model_id)
        print(f"Decoded model_id: {decoded_model_id}")
        
        # Try to get from database first
        model = db.query(AIModel).filter(AIModel.id == decoded_model_id).first()
        print(f"Found in database: {bool(model)}")
        
        if model:
            # Convert SQLAlchemy model to dict
            model_dict = {
                column.name: getattr(model, column.name)
                for column in model.__table__.columns
            }
            print("Returning model from database")
            return {"status": "success", "model": model_dict}
        
        # If not in database, scrape it
        print("Model not found in database, scraping from Hugging Face...")
        result = await scrape_specific_model(decoded_model_id)
        print(f"Scraping result status: {result['status']}")
        
        if result["status"] == "error":
            print(f"Scraping error: {result['message']}")
            raise HTTPException(status_code=404, detail=result["message"])
        
        # Create new model in database
        try:
            model_data = result["model"]
            print("Creating new model in database")
            model = AIModel(**model_data)
            db.add(model)
            db.commit()
            db.refresh(model)
            
            # Convert SQLAlchemy model to dict
            model_dict = {
                column.name: getattr(model, column.name)
                for column in model.__table__.columns
            }
            print("Successfully saved and returning model")
            return {"status": "success", "model": model_dict}
        except Exception as db_error:
            print(f"Database error: {str(db_error)}")
            print(traceback.format_exc())
            # Return the scraped data even if database storage fails
            print("Returning scraped data despite database error")
            return result
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in get_model_detailed: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=AIModelResponse)
async def create_model(
    *,
    db: Session = Depends(get_db),
    model_in: AIModelCreate,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Create new AI model. Only for superusers.
    """
    model = AIModel(**model_in.dict())
    db.add(model)
    db.commit()
    db.refresh(model)
    return model

@router.put("/{model_id}", response_model=AIModelResponse)
async def update_model(
    *,
    db: Session = Depends(get_db),
    model_id: str,
    model_in: AIModelUpdate,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Update AI model. Only for superusers.
    """
    model = db.query(AIModel).filter(AIModel.id == model_id).first()
    if not model:
        raise HTTPException(
            status_code=404,
            detail="Model not found",
        )
    
    for field, value in model_in.dict(exclude_unset=True).items():
        setattr(model, field, value)
    
    db.add(model)
    db.commit()
    db.refresh(model)
    return model

@router.delete("/{model_id}", response_model=AIModelResponse)
async def delete_model(
    *,
    db: Session = Depends(get_db),
    model_id: str,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Delete AI model. Only for superusers.
    """
    model = db.query(AIModel).filter(AIModel.id == model_id).first()
    if not model:
        raise HTTPException(
            status_code=404,
            detail="Model not found",
        )
    db.delete(model)
    db.commit()
    return model

@router.post("/scrape", status_code=202)
async def scrape_models(
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_superuser),
) -> Any:
    """
    Trigger model scraping from Replicate and Hugging Face. Only for superusers.
    """
    background_tasks.add_task(scrape_replicate_models)
    background_tasks.add_task(scrape_huggingface_models)
    return {"message": "Model scraping started in the background"}

@router.get("/{model_id}/refresh")
async def refresh_model(model_id: str) -> Dict[str, Any]:
    """
    Force refresh model data from Hugging Face.
    """
    result = await scrape_specific_model(model_id)
    if result["status"] == "error":
        raise HTTPException(status_code=404, detail=result["message"])
    
    return result 