import httpx
from typing import List, Dict, Any, Optional
from models.database import get_db
import os
import re
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from datetime import datetime
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

# Define model categories and their associated keywords
MODEL_CATEGORIES = {
    "text-generation": [
        "text-generation", "gpt", "llm", "language-model", "chat", "completion",
        "text2text", "summarization", "translation"
    ],
    "image-generation": [
        "text-to-image", "image-generation", "stable-diffusion", "gan", 
        "text2image", "diffusion", "dalle", "midjourney"
    ],
    "image-to-text": [
        "image-to-text", "image-captioning", "ocr", "optical-character-recognition",
        "visual-question-answering", "image2text"
    ],
    "text-to-speech": [
        "text-to-speech", "tts", "speech-synthesis", "voice-generation",
        "text2speech", "audio-generation"
    ],
    "speech-to-text": [
        "speech-to-text", "speech-recognition", "transcription", "stt",
        "voice-recognition", "speech2text"
    ],
    "audio-generation": [
        "audio-generation", "music-generation", "sound-generation",
        "audio-synthesis", "music-synthesis"
    ],
    "computer-vision": [
        "object-detection", "image-classification", "face-detection",
        "semantic-segmentation", "pose-estimation", "image-recognition"
    ],
    "video-generation": [
        "text-to-video", "video-generation", "animation", "motion-synthesis",
        "text2video"
    ],
    "multimodal": [
        "multimodal", "vision-language", "audio-visual", "multi-task",
        "cross-modal"
    ],
    "other": []  # Fallback category
}

def determine_model_category(model_data: Dict[str, Any]) -> str:
    """
    Determine the category of a model based on its tags, description, and pipeline tag.
    """
    # Combine all relevant text for category matching
    model_text = " ".join([
        model_data.get("description", "").lower(),
        " ".join(model_data.get("tags", [])).lower(),
        model_data.get("pipeline_tag", "").lower(),
        model_data.get("name", "").lower()
    ])

    # Check each category's keywords against the model text
    for category, keywords in MODEL_CATEGORIES.items():
        if any(keyword in model_text for keyword in keywords):
            return category
    
    return "other"

async def fetch_model_papers(client: httpx.AsyncClient, model_id: str) -> List[Dict[str, str]]:
    """Fetch research papers associated with the model."""
    try:
        response = await client.get(f"https://huggingface.co/{model_id}/papers")
        if response.status_code == 200:
            papers = []
            soup = BeautifulSoup(response.text, 'html.parser')
            paper_elements = soup.find_all('a', {'class': 'paper-link'})
            for paper in paper_elements:
                papers.append({
                    "title": paper.get_text(strip=True),
                    "url": paper.get('href'),
                    "type": "paper"
                })
            return papers
    except Exception as e:
        print(f"Error fetching papers for {model_id}: {e}")
    return []

async def fetch_model_spaces(client: httpx.AsyncClient, model_id: str) -> List[Dict[str, Any]]:
    """Fetch spaces using this model."""
    try:
        response = await client.get(
            f"https://huggingface.co/api/models/{model_id}/spaces",
            params={"limit": 100}
        )
        if response.status_code == 200:
            return response.json()
    except Exception as e:
        print(f"Error fetching spaces for {model_id}: {e}")
    return []

async def fetch_model_tree(client: httpx.AsyncClient, model_id: str) -> Dict[str, Any]:
    """Fetch model tree information including adapters, finetuning, merges, etc."""
    try:
        response = await client.get(
            f"https://huggingface.co/api/models/{model_id}/tree"
        )
        if response.status_code == 200:
            tree_data = response.json()
            return {
                "adapters": tree_data.get("adapters", []),
                "finetunes": tree_data.get("finetunes", []),
                "merges": tree_data.get("merges", []),
                "quantizations": tree_data.get("quantizations", [])
            }
    except Exception as e:
        print(f"Error fetching model tree for {model_id}: {e}")
    return {}

async def fetch_model_technical_details(client: httpx.AsyncClient, model_id: str) -> Dict[str, Any]:
    """Fetch detailed technical specifications of the model."""
    try:
        response = await client.get(
            f"https://huggingface.co/api/models/{model_id}/specs"
        )
        if response.status_code == 200:
            specs = response.json()
            return {
                "model_size": specs.get("model_size"),
                "tensor_type": specs.get("tensor_type"),
                "parameters": specs.get("parameters"),
                "architecture": specs.get("architecture"),
                "license": specs.get("license"),
                "dataset_used": specs.get("dataset"),
                "training_data": specs.get("training_data"),
                "inference_providers": specs.get("inference_providers", []),
                "safetensors": specs.get("safetensors", False)
            }
    except Exception as e:
        print(f"Error fetching technical details for {model_id}: {e}")
    return {}

async def fetch_model_citation(client: httpx.AsyncClient, model_id: str) -> Optional[str]:
    """Fetch citation information for the model."""
    try:
        response = await client.get(f"https://huggingface.co/{model_id}/raw/main/README.md")
        if response.status_code == 200:
            content = response.text
            citation_match = re.search(r'```(?:bibtex)?\s*(@.*?)\s*```', content, re.DOTALL)
            if citation_match:
                return citation_match.group(1).strip()
    except Exception as e:
        print(f"Error fetching citation for {model_id}: {e}")
    return None

async def fetch_model_downloads(client: httpx.AsyncClient, model_id: str) -> Dict[str, Any]:
    """Fetch download statistics for the model."""
    try:
        response = await client.get(f"https://huggingface.co/api/models/{model_id}/downloads")
        if response.status_code == 200:
            return response.json()
    except Exception as e:
        print(f"Error fetching downloads for {model_id}: {e}")
    return {}

async def scrape_specific_model(model_id: str) -> Dict[str, Any]:
    """
    Scrape detailed information for a specific model.
    """
    logger.info(f"Starting to scrape model: {model_id}")
    
    headers = {}
    if HUGGINGFACE_API_KEY:
        headers["Authorization"] = f"Bearer {HUGGINGFACE_API_KEY}"
        logger.info("Using Hugging Face API key")
    else:
        logger.warning("No Hugging Face API key found")
    
    async with httpx.AsyncClient(headers=headers) as client:
        # Fetch basic model info
        logger.info(f"Fetching basic info for model: {model_id}")
        response = await client.get(f"https://huggingface.co/api/models/{model_id}")
        logger.info(f"Basic info response status: {response.status_code}")
        
        if response.status_code != 200:
            logger.error(f"Error fetching model: {response.text}")
            return {"status": "error", "message": "Model not found"}
            
        model = response.json()
        logger.info("Successfully fetched basic model info")
        
        # Fetch all additional metadata concurrently
        logger.info("Fetching additional metadata")
        papers = await fetch_model_papers(client, model_id)
        spaces = await fetch_model_spaces(client, model_id)
        tree_data = await fetch_model_tree(client, model_id)
        technical_details = await fetch_model_technical_details(client, model_id)
        citation = await fetch_model_citation(client, model_id)
        downloads_stats = await fetch_model_downloads(client, model_id)
        
        # Determine model category
        model_data = {
            "description": model.get("description", ""),
            "tags": model.get("tags", []),
            "name": model_id,
            "pipeline_tag": model.get("pipeline_tag", "")
        }
        category = determine_model_category(model_data)
        
        # Compile complete model data
        model_data = {
            "id": model_id,
            "name": model_id,
            "creator": model.get("author", ""),
            "source": "huggingface",
            "category": category,
            "description": model.get("description", ""),
            "huggingface_url": f"https://huggingface.co/{model_id}",
            "replicate_url": None,
            "benchmark_metrics": model.get("metrics", {}),
            "tags": model.get("tags", []),
            "last_updated": datetime.strptime(model.get("lastModified"), "%Y-%m-%dT%H:%M:%S.%fZ") if model.get("lastModified") else None,
            "downloads": downloads_stats.get("downloads", 0),
            "likes": model.get("likes", 0),
            "model_type": "downloadable",
            
            # Enhanced metadata
            "papers": papers,
            "spaces": spaces,
            "model_tree": tree_data,
            "technical_details": technical_details,
            "citation": citation,
            
            # Additional HF-specific metadata
            "pipeline_tag": model.get("pipeline_tag"),
            "mask_token": model.get("mask_token"),
            "widget_data": model.get("widgetData"),
            "config": model.get("config", {}),
            "card_data": model.get("cardData", {}),
            
            # Community metrics
            "discussion_count": model.get("discussionCount", 0),
            "pull_requests": model.get("pullRequests", []),
            "gated": model.get("gated", False),
            "private": model.get("private", False),
            "siblings": model.get("siblings", []),
            "tasks": model.get("tasks", []),
            
            # Files and assets
            "files": model.get("files", []),
            "model_index": model.get("modelIndex", {}),
            "available_libraries": model.get("libraries", []),
            
            # Timestamps
            "created_at": None,  # Let SQLAlchemy handle this
            "updated_at": None   # Let SQLAlchemy handle this
        }
        
        logger.info("Successfully compiled model data")
        return {
            "status": "success",
            "model": model_data
        }

async def scrape_models() -> Dict[str, Any]:
    """
    Scrapes AI models from Replicate and Hugging Face with enhanced metadata.
    """
    # Implementation here
    pass

async def get_categories_distribution(db) -> Dict[str, int]:
    """
    Get the distribution of models across categories.
    """
    result = db.table("ai_models")\
              .select("category, count(*)")\
              .group_by("category")\
              .execute()
    
    return {row["category"]: row["count"] for row in result.data} 