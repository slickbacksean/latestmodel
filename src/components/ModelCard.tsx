import { HuggingFaceModelCard } from '@/lib/types/huggingface';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface ModelCardProps {
  model: HuggingFaceModelCard;
}

export function ModelCard({ model }: ModelCardProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'files' | 'metrics'>('about');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [shouldTruncate, setShouldTruncate] = useState(false);

  useEffect(() => {
    console.log('ModelCard - Received model data:', JSON.stringify(model, null, 2));
    // Check if description is long enough to need truncation
    setShouldTruncate(model.description.length > 500);
  }, [model]);

  if (!model) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6">
        <p className="text-gray-500 dark:text-gray-400">No model data available</p>
      </div>
    );
  }

  const description = model.description || 'No description available';
  const displayDescription = shouldTruncate && !isDescriptionExpanded 
    ? description.slice(0, 500) + '...' 
    : description;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {model.name || 'Unnamed Model'}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {model.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{displayDescription}</ReactMarkdown>
        </div>
        {shouldTruncate && (
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="mt-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isDescriptionExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⬇️</span>
          <div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {(model.downloads || 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Downloads</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">❤️</span>
          <div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {(model.likes || 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Likes</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">📅</span>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Updated {model.updatedAt ? new Date(model.updatedAt).toLocaleDateString() : 'Unknown'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex px-6 bg-gray-50 dark:bg-gray-900" aria-label="Tabs">
          {['about', 'files', 'metrics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`
                px-4 py-3 text-sm font-medium border-b-2 -mb-px
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6 bg-white dark:bg-gray-800">
        {activeTab === 'about' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="text-2xl">👤</span> Author
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg pl-8">
                {model.author || 'Unknown'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="text-2xl">📜</span> License
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg pl-8">
                {model.license || 'Unknown'}
              </p>
            </div>
            {model.tasks && model.tasks.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <span className="text-2xl">🎯</span> Tasks
                </h3>
                <div className="mt-2 flex flex-wrap gap-2 pl-8">
                  {model.tasks.map((task) => (
                    <span
                      key={task}
                      className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm"
                    >
                      {task}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-4">
            {model.metrics && model.metrics.length > 0 ? (
              model.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300 text-lg">{metric.name}</span>
                  <span className="text-xl font-medium text-gray-900 dark:text-white">
                    {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No metrics available</p>
            )}
          </div>
        )}

        {activeTab === 'files' && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                View complete model files and documentation on{' '}
                <a
                  href={`https://huggingface.co/${model.modelId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Hugging Face
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 