export interface ModelMetrics {
  speed: string;
  size: string;
  rating: string;
}

export interface CategoryModel {
  id: number;
  title: string;
  description: string;
  model: string;
  metrics: ModelMetrics;
  tags: string[];
  category: string;
  access: string;
}

export interface Category {
  title: string;
  id: string;
  description: string;
  models: CategoryModel[];
} 