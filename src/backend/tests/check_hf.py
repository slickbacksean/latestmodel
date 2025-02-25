from dotenv import load_dotenv
import os
from huggingface_hub import HfApi
import sys

def main():
    # Load environment variables from .env file
    load_dotenv()
    
    print("\nChecking Hugging Face API Setup")
    print("==============================")
    
    # Check API key
    api_key = os.getenv("HUGGINGFACE_API_KEY")
    if not api_key:
        print("❌ HUGGINGFACE_API_KEY not found in environment variables")
        sys.exit(1)
    print("✓ Found Hugging Face API key")
    
    try:
        # Initialize API client
        api = HfApi(token=api_key)
        print("✓ Initialized API client")
        
        # Test API connection
        print("Testing API connection...")
        models = list(api.list_models(limit=1))
        if not models:
            print("❌ No models retrieved from API")
            sys.exit(1)
        
        print(f"✓ Successfully retrieved model: {models[0].modelId}")
        
        # Test model info retrieval
        print("\nTesting model info retrieval...")
        model_info = api.model_info("stabilityai/stable-diffusion-2-1")
        print(f"✓ Retrieved model info:")
        print(f"  - Downloads: {getattr(model_info, 'downloads', 'N/A')}")
        print(f"  - Tags: {getattr(model_info, 'tags', [])}")
        
        print("\n✅ All checks passed successfully!")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main() 