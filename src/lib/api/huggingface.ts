import { HuggingFaceModelCard } from '../types/huggingface';

const HUGGINGFACE_API_URL = 'https://huggingface.co/api';

export async function fetchModelDetails(modelId: string): Promise<HuggingFaceModelCard> {
  const response = await fetch(`${HUGGINGFACE_API_URL}/models/${modelId}`, {
    headers: {
      'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch model details: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    id: data.id || modelId,
    modelId: modelId,
    name: data.modelId || modelId,
    description: data.description || '',
    tags: data.tags || [],
    downloads: data.downloads || 0,
    likes: data.likes || 0,
    createdAt: data.createdAt || '',
    updatedAt: data.lastModified || '',
    author: data.author || '',
    license: data.license || '',
    pipeline_tag: data.pipeline_tag,
    tasks: data.tasks,
    languages: data.languages,
    metrics: data.metrics,
    model_type: data.model_type,
    library_name: data.library_name,
    config: data.config,
  };
}

export async function searchModels(query: string): Promise<HuggingFaceModelCard[]> {
  const response = await fetch(`${HUGGINGFACE_API_URL}/models?search=${encodeURIComponent(query)}`, {
    headers: {
      'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to search models: ${response.statusText}`);
  }

  const data = await response.json();
  return data.map((model: any) => ({
    id: model.id,
    modelId: model.modelId,
    name: model.modelId,
    description: model.description || '',
    tags: model.tags || [],
    downloads: model.downloads || 0,
    likes: model.likes || 0,
    createdAt: model.createdAt || '',
    updatedAt: model.lastModified || '',
    author: model.author || '',
    license: model.license || '',
    pipeline_tag: model.pipeline_tag,
    tasks: model.tasks,
    languages: model.languages,
    metrics: model.metrics,
    model_type: model.model_type,
    library_name: model.library_name,
    config: model.config,
  }));
} 