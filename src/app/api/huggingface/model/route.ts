import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const modelId = searchParams.get('modelId');

  console.log('API Route - Received request for model:', modelId);

  if (!modelId) {
    console.error('API Route - No modelId provided');
    return NextResponse.json({ error: 'Model ID is required' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
  if (!apiKey) {
    console.error('API Route - No Hugging Face API key found in environment variables');
    return NextResponse.json(
      { error: 'Hugging Face API key not configured. Please add NEXT_PUBLIC_HUGGINGFACE_API_KEY to your .env.local file' },
      { status: 500 }
    );
  }

  try {
    console.log('API Route - Fetching data from Hugging Face API...');
    
    // Fetch both model info and README content in parallel
    const [modelResponse, readmeResponse] = await Promise.all([
      fetch(`https://huggingface.co/api/models/${modelId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }),
      fetch(`https://huggingface.co/api/models/${modelId}/readme`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      })
    ]);

    if (!modelResponse.ok) {
      console.error('API Route - Hugging Face API error:', modelResponse.status, modelResponse.statusText);
      throw new Error(`Failed to fetch model data: ${modelResponse.statusText}`);
    }

    const [modelData, readmeData] = await Promise.all([
      modelResponse.json(),
      readmeResponse.ok ? readmeResponse.json() : { content: '' }
    ]);

    console.log('API Route - Received data from Hugging Face:', { modelData, readmeData });

    // Transform the data to match our expected format
    const transformedData = {
      id: modelData.id || modelId,
      modelId: modelData.modelId || modelData.id || modelId,
      name: modelData.id?.split('/').pop() || modelId.split('/').pop() || '',
      description: modelData.description || readmeData.content || '',
      tags: modelData.tags || [],
      downloads: modelData.downloads || 0,
      likes: modelData.likes || 0,
      createdAt: modelData.createdAt || new Date().toISOString(),
      updatedAt: modelData.lastModified || new Date().toISOString(),
      author: modelData.author || modelData.id?.split('/')[0] || modelId.split('/')[0] || '',
      license: modelData.license || 'Unknown',
      pipeline_tag: modelData.pipeline_tag,
      tasks: modelData.tags?.filter((tag: string) => !tag.includes(':') && !tag.includes('_')) || [],
      languages: modelData.languages,
      model_type: modelData.model_type,
      library_name: modelData.library_name,
      config: modelData.config,
      metrics: [
        {
          type: 'downloads',
          value: modelData.downloads || 0,
          name: 'Downloads'
        },
        {
          type: 'likes',
          value: modelData.likes || 0,
          name: 'Likes'
        }
      ]
    };

    console.log('API Route - Transformed data:', transformedData);
    return NextResponse.json({ model: transformedData });
  } catch (error) {
    console.error('API Route - Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch model data from Hugging Face' },
      { status: 500 }
    );
  }
} 