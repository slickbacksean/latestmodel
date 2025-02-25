from huggingface_hub import HfApi
import os

def main():
    print("\nTesting Hugging Face API Connection")
    print("==================================")
    
    # Get API token
    token = os.getenv("HUGGINGFACE_API_KEY")
    if not token:
        print("❌ Error: HUGGINGFACE_API_KEY not found in environment variables")
        return
    
    print("✓ Found API token")
    
    try:
        # Initialize API
        api = HfApi(token=token)
        print("✓ Initialized API client")
        
        # Test API connection
        models = list(api.list_models(limit=1))
        if models:
            print(f"✓ Successfully connected to API")
            print(f"✓ Retrieved model: {models[0].modelId}")
        else:
            print("❌ Error: No models retrieved")
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    main() 