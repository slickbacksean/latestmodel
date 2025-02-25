export interface HuggingFaceMetric {
  type: string;
  value: number;
  name: string;
}

export interface HuggingFaceModelCard {
  id: string;
  modelId: string;
  name: string;
  description: string;
  tags: string[];
  downloads: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  author: string;
  license: string;
  pipeline_tag?: string;
  tasks?: string[];
  languages?: string[];
  metrics: HuggingFaceMetric[];
  model_type?: string;
  library_name?: string;
  config?: {
    architectures?: string[];
    model_type?: string;
    [key: string]: any;
  };
}

export interface ModelCardResponse {
  model: HuggingFaceModelCard;
  error?: string;
  loading?: boolean;
} 