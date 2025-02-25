import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { config } from '@/app/config'

type ModelData = {
  status: string;
  model: {
    id: string;
    name: string;
    creator: string;
    description: string;
    category: string;
    tags: string[];
    downloads: number;
    likes: number;
    technical_details: {
      model_size?: string;
      parameters?: string;
      tensor_type?: string;
    };
    model_tree: {
      adapters: any[];
      finetunes: any[];
      merges: any[];
      quantizations: any[];
    };
    spaces: Array<{
      id: string;
      title: string;
      author: string;
    }>;
    papers: Array<{
      title: string;
      url: string;
    }>;
    citation: string | null;
  };
}

// Server-side data fetching
async function getModelData(modelId: string): Promise<ModelData | null> {
  if (!modelId) {
    console.error('No model ID provided to getModelData')
    return null
  }

  try {
    const encodedModelId = encodeURIComponent(modelId)
    console.log('Fetching model data for:', encodedModelId)
    
    const url = `${config.api.endpoints.models}/${encodedModelId}`
    console.log('Fetching from URL:', url)
    
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60 // Revalidate every minute
      }
    })
    
    console.log('Response status:', res.status)
    
    if (!res.ok) {
      if (res.status === 404) {
        console.error('Model not found')
        return null
      }
      console.error('Response not OK:', res.status, res.statusText)
      const errorText = await res.text()
      console.error('Error response:', errorText)
      throw new Error(`Failed to fetch model data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    console.log('Response data:', JSON.stringify(data, null, 2))

    // Validate the response data structure
    if (!data || !data.model || typeof data.model !== 'object') {
      console.error('Invalid response data structure:', data)
      throw new Error('Invalid response data structure')
    }

    return data
  } catch (error) {
    console.error('Error fetching model data:', error)
    throw error
  }
}

type PageProps = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  if (!params?.id) {
    return { title: 'Model Not Found' }
  }
  
  const modelData = await getModelData(params.id)
  if (!modelData) {
    return { title: 'Model Not Found' }
  }
  
  return {
    title: `${modelData.model.name} - AI Model Details`,
    description: modelData.model.description
  }
}

function ModelTechnicalDetails({ details }: { details: ModelData['model']['technical_details'] }) {
  if (!details) return null
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {details.model_size && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium">Model Size</h3>
          <p>{details.model_size}</p>
        </div>
      )}
      {details.parameters && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium">Parameters</h3>
          <p>{details.parameters}</p>
        </div>
      )}
      {details.tensor_type && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium">Tensor Type</h3>
          <p>{details.tensor_type}</p>
        </div>
      )}
    </div>
  )
}

function ModelTree({ tree }: { tree: ModelData['model']['model_tree'] }) {
  if (!tree) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium">Adapters</h3>
        <p className="text-2xl font-bold">{tree.adapters?.length || 0}</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium">Finetuned Versions</h3>
        <p className="text-2xl font-bold">{tree.finetunes?.length || 0}</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium">Merges</h3>
        <p className="text-2xl font-bold">{tree.merges?.length || 0}</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium">Quantizations</h3>
        <p className="text-2xl font-bold">{tree.quantizations?.length || 0}</p>
      </div>
    </div>
  )
}

export default async function ModelPage({ params }: { params: { id: string } }) {
  const id = params.id; // Ensure params is accessed correctly
  if (!id) {
    console.error('No model ID provided');
    notFound();
  }

  const decodedId = decodeURIComponent(id);
  console.log('Rendering page for model ID:', decodedId);
  
  const modelData = await getModelData(decodedId);
  if (!modelData) {
    console.error('No model data found');
    notFound();
  }
  
  const model = modelData.model
  console.log('Model object:', model)
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{model.name || 'Unnamed Model'}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>By {model.creator || 'Unknown Creator'}</span>
          <span>•</span>
          <span>{(model.downloads || 0).toLocaleString()} Downloads</span>
          <span>•</span>
          <span>{model.likes || 0} Likes</span>
        </div>
      </div>

      {/* Tags and Category */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {Array.isArray(model.tags) && model.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        {model.category && (
          <div className="mt-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {model.category}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      {model.description && (
        <div className="prose max-w-none mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p>{model.description}</p>
        </div>
      )}

      {/* Technical Details */}
      {model.technical_details && Object.keys(model.technical_details).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Technical Details</h2>
          <ModelTechnicalDetails details={model.technical_details} />
        </div>
      )}

      {/* Model Tree */}
      {model.model_tree && Object.keys(model.model_tree).length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Model Variants</h2>
          <ModelTree tree={model.model_tree} />
        </div>
      )}

      {/* Spaces Section */}
      {Array.isArray(model.spaces) && model.spaces.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Spaces Using This Model</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {model.spaces.map((space) => (
              <a
                key={space.id}
                href={`https://huggingface.co/spaces/${space.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="font-medium">{space.title || space.id}</h3>
                <p className="text-sm text-gray-600">{space.author}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Papers Section */}
      {Array.isArray(model.papers) && model.papers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Research Papers</h2>
          <div className="space-y-4">
            {model.papers.map((paper, index) => (
              <a
                key={index}
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium">{paper.title}</h3>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Citation */}
      {model.citation && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Citation</h2>
          <pre className="p-4 bg-gray-50 rounded-lg overflow-x-auto">
            <code>{model.citation}</code>
          </pre>
        </div>
      )}
    </div>
  )
} 