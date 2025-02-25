import os
import pytest
from huggingface_hub import HfApi
from datetime import datetime, timezone
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_api_token():
    """Get Hugging Face API token from environment variables."""
    token = os.getenv("HUGGINGFACE_API_KEY")
    if not token:
        raise ValueError(
            "HUGGINGFACE_API_KEY environment variable not set. "
            "Please set it in your .env file."
        )
    return token

def test_huggingface_api_connection():
    """Test basic connection to Hugging Face API."""
    try:
        token = get_api_token()
        api = HfApi(token=token)
        models = api.list_models(limit=1)
        model_list = list(models)
        assert len(model_list) > 0
        logger.info(f"Successfully connected to Hugging Face API. Found model: {model_list[0].modelId}")
    except ValueError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(f"Failed to connect to Hugging Face API: {e}")
        raise

def test_model_info_retrieval():
    """Test retrieving detailed model information."""
    try:
        token = get_api_token()
        api = HfApi(token=token)
        # Test with a public model that doesn't require special access
        model_id = "stabilityai/stable-diffusion-2-1"
        model_info = api.model_info(model_id)
        
        assert model_info is not None
        assert model_info.id == model_id
        assert hasattr(model_info, 'downloads')
        assert hasattr(model_info, 'likes')
        
        logger.info(f"Successfully retrieved model info for {model_id}")
        logger.info(f"Model downloads: {model_info.downloads}, likes: {model_info.likes}")
    except ValueError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(f"Failed to retrieve model info: {e}")
        raise

def test_model_tags_retrieval():
    """Test retrieving model tags and categories."""
    try:
        token = get_api_token()
        api = HfApi(token=token)
        models = api.list_models(filter="text-generation", limit=5)
        
        model_count = 0
        for model in models:
            assert model.modelId is not None
            assert hasattr(model, 'tags')
            logger.info(f"Model {model.modelId} tags: {model.tags}")
            model_count += 1
        
        assert model_count > 0, "No models were retrieved"
    except ValueError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(f"Failed to retrieve model tags: {e}")
        raise

def test_model_search():
    """Test model search functionality."""
    try:
        token = get_api_token()
        api = HfApi(token=token)
        search_query = "stable diffusion"
        models = api.list_models(search=search_query, limit=5)
        
        model_list = list(models)
        assert len(model_list) > 0
        
        for model in model_list:
            logger.info(f"Found model: {model.modelId}")
            assert any([
                search_query.lower() in model.modelId.lower(),
                hasattr(model, 'description') and model.description and search_query.lower() in model.description.lower()
            ])
            
        logger.info(f"Successfully searched for models with query: {search_query}")
    except ValueError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(f"Failed to search models: {e}")
        raise

def test_model_files():
    """Test retrieving model files and metadata."""
    try:
        token = get_api_token()
        api = HfApi(token=token)
        model_id = "stabilityai/stable-diffusion-2-1"
        
        # Test file listing
        files = api.list_repo_files(model_id)
        assert len(files) > 0
        logger.info(f"Found {len(files)} files for model {model_id}")
        
        # Test model card retrieval
        try:
            card = api.model_info(model_id)
            assert card is not None
            logger.info(f"Successfully retrieved model card for {model_id}")
            
            # Log some interesting metadata
            metadata = {
                "tags": card.tags,
                "pipeline_tag": card.pipeline_tag if hasattr(card, 'pipeline_tag') else None,
                "downloads": card.downloads if hasattr(card, 'downloads') else None,
                "likes": card.likes if hasattr(card, 'likes') else None,
            }
            logger.info(f"Model metadata: {metadata}")
        except Exception as e:
            logger.warning(f"Could not retrieve model card: {e}")
        
    except ValueError as e:
        logger.error(str(e))
        raise
    except Exception as e:
        logger.error(f"Failed to retrieve model files: {e}")
        raise

if __name__ == "__main__":
    # Run all tests
    test_functions = [
        test_huggingface_api_connection,
        test_model_info_retrieval,
        test_model_tags_retrieval,
        test_model_search,
        test_model_files
    ]
    
    print("\nRunning Hugging Face API Tests")
    print("==============================")
    
    for test in test_functions:
        try:
            print(f"\nRunning {test.__name__}...")
            test()
            print(f"✅ {test.__name__} passed")
        except Exception as e:
            print(f"❌ {test.__name__} failed: {e}")
    
    print("\nTests completed.") 