import os
import requests
from typing import List, Dict, Any, Optional
from datetime import datetime
from bs4 import BeautifulSoup
from huggingface_hub import HfApi
from dotenv import load_dotenv
import httpx
import asyncio
from sqlalchemy.orm import Session
import logging
from urllib.parse import urljoin
import re
import json

from models.database import SessionLocal
from models.models import AIModel

load_dotenv()

REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")
HUGGINGFACE_API_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BASE_URL = "https://replicate.com"
MODELS_URL = f"{BASE_URL}/explore"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

async def fetch_page(url: str, client: httpx.AsyncClient) -> Optional[str]:
    """Fetch a page with retry logic."""
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = await client.get(url, headers=HEADERS, timeout=30.0)
            response.raise_for_status()
            return response.text
        except httpx.HTTPError as e:
            logger.error(f"HTTP error occurred: {e}")
            if attempt == max_retries - 1:
                return None
            await asyncio.sleep(2 ** attempt)  # Exponential backoff
        except Exception as e:
            logger.error(f"Error fetching {url}: {e}")
            return None

async def parse_model_page(url: str, client: httpx.AsyncClient) -> Optional[Dict[str, Any]]:
    """Parse individual model page to extract detailed information."""
    html = await fetch_page(url, client)
    if not html:
        return None

    soup = BeautifulSoup(html, 'html.parser')
    
    try:
        # Extract model information
        title_elem = soup.find('h1')
        description_elem = soup.find('div', {'class': 'markdown'})
        metrics_elem = soup.find('div', {'class': 'stats'})
        
        # Find the script tag containing the model data
        script_tags = soup.find_all('script', {'type': 'application/json'})
        model_json_data = {}
        for script in script_tags:
            try:
                data = json.loads(script.string)
                if isinstance(data, dict) and 'props' in data:
                    model_json_data = data
                    break
            except:
                continue

        # Extract version information
        versions = []
        versions_section = soup.find('div', {'id': 'versions'})
        if versions_section:
            version_items = versions_section.find_all('div', {'class': 'version'})
            for item in version_items:
                version_info = {
                    'id': item.get('id', '').replace('version-', ''),
                    'name': item.find('div', {'class': 'version-name'}).text.strip() if item.find('div', {'class': 'version-name'}) else '',
                    'created_at': item.find('time').get('datetime') if item.find('time') else None
                }
                versions.append(version_info)

        # Extract example section
        examples = []
        examples_section = soup.find('div', {'id': 'examples'})
        if examples_section:
            example_items = examples_section.find_all('div', {'class': 'example'})
            for item in example_items:
                example = {
                    'title': item.find('h3').text.strip() if item.find('h3') else '',
                    'description': item.find('p').text.strip() if item.find('p') else '',
                    'input': item.find('pre', {'class': 'input'}).text.strip() if item.find('pre', {'class': 'input'}) else '',
                    'output': item.find('pre', {'class': 'output'}).text.strip() if item.find('pre', {'class': 'output'}) else ''
                }
                examples.append(example)

        # Extract hardware requirements and performance metrics
        hardware_section = soup.find('div', {'id': 'hardware'})
        hardware_info = {}
        if hardware_section:
            hardware_items = hardware_section.find_all('div', {'class': 'spec'})
            for item in hardware_items:
                key = item.find('div', {'class': 'label'}).text.strip() if item.find('div', {'class': 'label'}) else ''
                value = item.find('div', {'class': 'value'}).text.strip() if item.find('div', {'class': 'value'}) else ''
                hardware_info[key.lower()] = value

        model_data = {
            "name": title_elem.text.strip() if title_elem else "Unknown",
            "creator": url.split('/')[-2] if len(url.split('/')) > 2 else "Unknown",
            "category": "uncategorized",  # Will be updated based on tags
            "description": description_elem.text.strip() if description_elem else "",
            "replicate_url": url,
            "metrics": {},
            "created_at": datetime.utcnow(),
            "is_featured": False,
            "access_level": "free",
            "versions": versions,
            "examples": examples,
            "hardware_requirements": hardware_info,
            "last_updated": None,
            "license": None,
            "paper_url": None,
            "github_url": None,
            "docker_image": None
        }

        # Extract metrics
        if metrics_elem:
            metrics = {}
            for stat in metrics_elem.find_all('div', {'class': 'stat'}):
                label = stat.find('div', {'class': 'label'})
                value = stat.find('div', {'class': 'value'})
                if label and value:
                    metrics[label.text.strip().lower()] = value.text.strip()
            model_data["metrics"] = metrics

        # Extract additional links
        links_section = soup.find('div', {'class': 'links'})
        if links_section:
            for link in links_section.find_all('a'):
                href = link.get('href', '')
                if 'github.com' in href:
                    model_data['github_url'] = href
                elif 'arxiv.org' in href or '.pdf' in href:
                    model_data['paper_url'] = href

        # Extract tags/categories
        tags_elem = soup.find('div', {'class': 'tags'})
        if tags_elem:
            tags = [tag.text.strip() for tag in tags_elem.find_all('a')]
            if tags:
                model_data["category"] = tags[0]  # Use first tag as primary category
                model_data["tags"] = tags

        # Extract license information
        license_elem = soup.find('div', {'class': 'license'})
        if license_elem:
            model_data['license'] = license_elem.text.strip()

        # Check if model is featured
        featured_badge = soup.find('div', {'class': 'featured-badge'})
        model_data["is_featured"] = bool(featured_badge)

        # Extract last updated date
        updated_elem = soup.find('time', {'class': 'updated'})
        if updated_elem:
            model_data['last_updated'] = updated_elem.get('datetime')

        # Extract Docker image information
        docker_elem = soup.find('pre', {'class': 'docker'})
        if docker_elem:
            model_data['docker_image'] = docker_elem.text.strip()

        return model_data
    except Exception as e:
        logger.error(f"Error parsing model page {url}: {e}")
        return None

async def get_model_urls(client: httpx.AsyncClient) -> List[str]:
    """Get all model URLs from the explore page."""
    model_urls = set()
    page = 1
    
    while True:
        url = f"{MODELS_URL}?page={page}"
        html = await fetch_page(url, client)
        if not html:
            break

        soup = BeautifulSoup(html, 'html.parser')
        model_links = soup.find_all('a', href=re.compile(r'/[^/]+/[^/]+$'))
        
        new_urls = {urljoin(BASE_URL, link['href']) for link in model_links}
        if not new_urls or new_urls.issubset(model_urls):
            break
            
        model_urls.update(new_urls)
        page += 1
        await asyncio.sleep(1)  # Rate limiting
    
    return list(model_urls)

async def scrape_replicate_models() -> None:
    """
    Scrape models from Replicate API and store them in the database.
    """
    if not REPLICATE_API_TOKEN:
        print("Replicate API token not found")
        return

    headers = {
        "Authorization": f"Token {REPLICATE_API_TOKEN}"
    }

    try:
        response = requests.get("https://api.replicate.com/v1/models", headers=headers)
        response.raise_for_status()
        models_data = response.json().get("results", [])

        db = SessionLocal()
        try:
            for model_data in models_data:
                model = db.query(AIModel).filter(
                    AIModel.source == "replicate",
                    AIModel.source_id == model_data["id"]
                ).first()

                if not model:
                    model = AIModel(
                        name=model_data["name"],
                        description=model_data.get("description", ""),
                        source="replicate",
                        source_id=model_data["id"],
                        creator=model_data.get("owner", ""),
                        url=f"https://replicate.com/{model_data['owner']}/{model_data['name']}",
                        created_at=datetime.now(),
                        updated_at=datetime.now()
                    )
                    db.add(model)
                else:
                    model.description = model_data.get("description", "")
                    model.updated_at = datetime.now()

            db.commit()
        finally:
            db.close()

    except Exception as e:
        print(f"Error scraping Replicate models: {str(e)}")

async def scrape_huggingface_models() -> None:
    """
    Scrape models from Hugging Face API and store them in the database.
    """
    if not HUGGINGFACE_API_TOKEN:
        print("Hugging Face API token not found")
        return

    try:
        api = HfApi(token=HUGGINGFACE_API_TOKEN)
        models = api.list_models(limit=100)  # Adjust limit as needed

        db = SessionLocal()
        try:
            for model_info in models:
                model = db.query(AIModel).filter(
                    AIModel.source == "huggingface",
                    AIModel.source_id == model_info.modelId
                ).first()

                if not model:
                    model = AIModel(
                        name=model_info.modelId,
                        description=model_info.description or "",
                        source="huggingface",
                        source_id=model_info.modelId,
                        creator=model_info.author or "",
                        url=f"https://huggingface.co/{model_info.modelId}",
                        created_at=datetime.now(),
                        updated_at=datetime.now()
                    )
                    db.add(model)
                else:
                    model.description = model_info.description or ""
                    model.updated_at = datetime.now()

            db.commit()
        finally:
            db.close()

    except Exception as e:
        print(f"Error scraping Hugging Face models: {str(e)}")

def scrape_all_models() -> None:
    """Function to be called by background task."""
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    
    try:
        loop.run_until_complete(scrape_replicate_models())
    finally:
        loop.close() 