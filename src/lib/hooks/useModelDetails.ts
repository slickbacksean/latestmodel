import { useState, useEffect } from 'react';
import { HuggingFaceModelCard, ModelCardResponse } from '../types/huggingface';

export function useModelDetails(modelId: string) {
  const [data, setData] = useState<ModelCardResponse>({
    model: {} as HuggingFaceModelCard,
    loading: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setData((prev) => ({ ...prev, loading: true }));
        const response = await fetch(`/api/huggingface/model?modelId=${encodeURIComponent(modelId)}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch model details');
        }

        setData({
          model: result.model,
          loading: false,
        });
      } catch (error) {
        setData({
          model: {} as HuggingFaceModelCard,
          error: error instanceof Error ? error.message : 'An error occurred',
          loading: false,
        });
      }
    }

    if (modelId) {
      fetchData();
    }
  }, [modelId]);

  return data;
} 