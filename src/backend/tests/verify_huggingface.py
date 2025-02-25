from huggingface_hub import HfApi
import os
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def verify_api():
    """Verify Hugging Face API functionality."""
    
    # Get API token
    token = os.getenv("HUGGINGFACE_API_KEY")
    if not token:
        logger.error("HUGGINGFACE_API_KEY not found in environment variables")
        return False
        
    try:
        logger.info("Initializing Hugging Face API client...")
        api = HfApi(token=token)
        
        # Test 1: Basic connection
        logger.info("Test 1: Verifying basic API connection...")
        models = list(api.list_models(limit=1))
        if not models:
            logger.error("No models retrieved")
            return False
        logger.info(f"✓ Successfully connected to API and retrieved model: {models[0].modelId}")
        
        # Test 2: Model info retrieval
        logger.info("\nTest 2: Retrieving model information...")
        model_id = "stabilityai/stable-diffusion-2-1"
        model_info = api.model_info(model_id)
        if not model_info:
            logger.error(f"Could not retrieve info for model {model_id}")
            return False
        logger.info(f"✓ Successfully retrieved model info:")
        logger.info(f"  - Downloads: {getattr(model_info, 'downloads', 'N/A')}")
        logger.info(f"  - Likes: {getattr(model_info, 'likes', 'N/A')}")
        logger.info(f"  - Tags: {getattr(model_info, 'tags', [])}")
        
        # Test 3: Search functionality
        logger.info("\nTest 3: Testing search functionality...")
        search_query = "stable diffusion"
        search_results = list(api.list_models(search=search_query, limit=5))
        if not search_results:
            logger.error(f"No results found for search query: {search_query}")
            return False
        logger.info(f"✓ Found {len(search_results)} models matching '{search_query}'")
        for model in search_results:
            logger.info(f"  - {model.modelId}")
        
        # Test 4: Model files
        logger.info("\nTest 4: Retrieving model files...")
        files = api.list_repo_files(model_id)
        if not files:
            logger.error(f"No files found for model {model_id}")
            return False
        logger.info(f"✓ Found {len(files)} files for model {model_id}")
        
        logger.info("\n✅ All API verification tests passed successfully!")
        return True
        
    except Exception as e:
        logger.error(f"API verification failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("\nHugging Face API Verification")
    print("============================")
    success = verify_api()
    print("\nVerification " + ("succeeded! ✅" if success else "failed! ❌")) 