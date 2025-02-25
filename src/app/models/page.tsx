"use client";

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import ModelsCarousel from '../components/ModelsCarousel';
import { generatePlaceholderDataURL } from '../components/Placeholder';

const ModelsContainer = styled.div`
  padding: 2rem;
  color: #fff;
`;

const FeaturedSection = styled.div`
  margin-bottom: 4rem;
`;

const FeaturedTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #999;
  max-width: 600px;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
`;

const FiltersSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
`;

const FilterGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  margin-bottom: 1rem;
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  
  &:hover {
    color: #fff;
  }
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  
  &::placeholder {
    color: #666;
  }
  
  &:focus {
    outline: none;
    border-color: #6b73ff;
  }
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  align-content: start;
`;

interface ModelCardProps {
  whileHover?: any;
  transition?: any;
}

const ModelCard = styled(motion.div)<ModelCardProps>`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const ModelImage = styled.div`
  width: 100%;
  height: 160px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
`;

const ModelContent = styled.div`
  padding: 1.5rem;
`;

const ModelTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const ModelDescription = styled.p`
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ModelMetrics = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background: rgba(107, 115, 255, 0.1);
  color: #6b73ff;
`;

const ModelTag = styled(Tag)`
  background: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
`;

const ModelCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

export const categories = [
  {
    title: "Generate images",
    id: "generate-images",
    description: "Models that generate images from text prompts",
    models: [
      {
        id: 1,
        title: 'Flux Pro Ultra',
        description: 'State-of-the-art text-to-image generation model',
        model: 'black-forest-labs/flux-1.1-pro-ultra',
        metrics: { speed: '2.5s', size: '6.9GB', rating: '4.8' },
        tags: ['Featured', 'Image Generation'],
        category: 'generate-images',
        access: 'pro'
      }
    ]
  },
  {
    title: "Generate videos",
    id: "generate-videos",
    description: "Models that create and edit videos",
    models: [
      {
        id: 2,
        title: 'Ray-2 720p',
        description: 'High-quality video generation model',
        model: 'luma/ray-2-720p',
        metrics: { speed: '15s', size: '12.5GB', rating: '4.8' },
        tags: ['Featured', 'Video Generation'],
        category: 'generate-videos',
        access: 'pro'
      }
    ]
  },
  {
    title: "Caption images",
    id: "caption-images",
    description: "Models that generate text from images",
    models: [
      {
        id: 3,
        title: 'LLaVA-13B',
        description: 'Advanced image understanding and captioning',
        model: 'yorickvp/llava-13b',
        metrics: { speed: '1.2s', size: '13GB', rating: '4.7' },
        tags: ['Featured', 'Image Captioning'],
        category: 'caption-images',
        access: 'pro'
      }
    ]
  },
  {
    title: "Transcribe speech",
    id: "transcribe-speech",
    description: "Models that convert speech to text",
    models: [
      {
        id: 4,
        title: 'WhisperX',
        description: 'Fast and accurate speech transcription',
        model: 'victor-upmeet/whisperx',
        metrics: { speed: '0.5x', size: '2.8GB', rating: '4.9' },
        tags: ['Featured', 'Speech Recognition'],
        category: 'transcribe-speech',
        access: 'free'
      }
    ]
  },
  {
    title: "Generate text",
    id: "generate-text",
    description: "Models that can understand and generate text",
    models: [
      {
        id: 5,
        title: 'Claude 3.5 Sonnet',
        description: 'Advanced language model with enhanced capabilities',
        model: 'anthropic/claude-3.5-sonnet',
        metrics: { speed: '1.2s', size: '8.5GB', rating: '4.9' },
        tags: ['Featured', 'Language Model'],
        category: 'generate-text',
        access: 'pro'
      }
    ]
  },
  {
    title: "Upscale images",
    id: "upscale-images",
    description: "Upscaling models that create high-quality images from low-quality images",
    models: [
      {
        id: 6,
        title: 'Real-ESRGAN',
        description: 'Professional image upscaling model',
        model: 'nightmareai/real-esrgan',
        metrics: { speed: '3.0s', size: '1.8GB', rating: '4.8' },
        tags: ['Featured', 'Image Enhancement'],
        category: 'upscale-images',
        access: 'free'
      }
    ]
  },
  {
    title: "Restore images",
    id: "restore-images",
    description: "Models that improve or restore images by deblurring, colorization, and removing noise",
    models: [
      {
        id: 7,
        title: 'BSRGAN',
        description: 'Advanced image restoration and enhancement',
        model: 'zsxkib/bsrgan',
        metrics: { speed: '2.5s', size: '2.1GB', rating: '4.7' },
        tags: ['Featured', 'Image Restoration'],
        category: 'restore-images',
        access: 'free'
      }
    ]
  },
  {
    title: "Enhance videos",
    id: "enhance-videos",
    description: "Models that enhance videos with super-resolution, sound effects, motion capture and other useful production effects",
    models: [
      {
        id: 8,
        title: 'Real-ESRGAN Video',
        description: 'High-quality video enhancement',
        model: 'lucataco/real-esrgan-video',
        metrics: { speed: '5.0x', size: '3.2GB', rating: '4.6' },
        tags: ['Featured', 'Video Enhancement'],
        category: 'enhance-videos',
        access: 'pro'
      }
    ]
  },
  {
    title: "Generate speech",
    id: "generate-speech",
    description: "Convert text to speech",
    models: [
      {
        id: 9,
        title: 'Kokoro TTS',
        description: 'High-quality text-to-speech synthesis',
        model: 'jaaari/kokoro-82m',
        metrics: { speed: '1.0s', size: '0.8GB', rating: '4.8' },
        tags: ['Featured', 'Speech Synthesis'],
        category: 'generate-speech',
        access: 'free'
      }
    ]
  },
  {
    title: "Caption videos",
    id: "caption-videos",
    description: "Models that generate text from videos",
    models: [
      {
        id: 10,
        title: 'CogVLM2 Video',
        description: 'Advanced video understanding and captioning',
        model: 'chenxwh/cogvlm2-video',
        metrics: { speed: '2.5s', size: '5.6GB', rating: '4.7' },
        tags: ['Featured', 'Video Captioning'],
        category: 'caption-videos',
        access: 'pro'
      }
    ]
  },
  {
    title: "Remove backgrounds",
    id: "remove-backgrounds",
    description: "Models that remove backgrounds from images and videos",
    models: [
      {
        id: 11,
        title: 'Remove BG',
        description: 'Professional background removal tool',
        model: 'lucataco/remove-bg',
        metrics: { speed: '1.0s', size: '1.2GB', rating: '4.9' },
        tags: ['Featured', 'Background Removal'],
        category: 'remove-backgrounds',
        access: 'free'
      }
    ]
  },
  {
    title: "Detect objects",
    id: "detect-objects",
    description: "Models that detect or segment objects in images and videos",
    models: [
      {
        id: 12,
        title: 'YOLO World',
        description: 'State-of-the-art object detection',
        model: 'zsxkib/yolo-world',
        metrics: { speed: '0.8s', size: '2.4GB', rating: '4.8' },
        tags: ['Featured', 'Object Detection'],
        category: 'detect-objects',
        access: 'free'
      }
    ]
  },
  {
    title: "Generate music",
    id: "generate-music",
    description: "Models to generate and modify music",
    models: [
      {
        id: 13,
        title: 'MusicGen',
        description: 'Advanced AI music generation',
        model: 'meta/musicgen',
        metrics: { speed: '5.0s', size: '3.6GB', rating: '4.7' },
        tags: ['Featured', 'Music Generation'],
        category: 'generate-music',
        access: 'free'
      }
    ]
  },
  {
    title: "Sing with voices",
    id: "sing-with-voices",
    description: "Voice-to-voice cloning and musical prosody",
    models: [
      {
        id: 14,
        title: 'RVC Voice Clone',
        description: 'Realistic voice cloning technology',
        model: 'zsxkib/realistic-voice-cloning',
        metrics: { speed: '3.0s', size: '1.8GB', rating: '4.6' },
        tags: ['Featured', 'Voice Cloning'],
        category: 'sing-with-voices',
        access: 'pro'
      }
    ]
  },
  {
    title: "Make 3D stuff",
    id: "make-3d",
    description: "Models that generate 3D objects, scenes, radiance fields, textures and multi-views",
    models: [
      {
        id: 15,
        title: 'Zero123++',
        description: '3D content generation from single images',
        model: 'jd7h/zero123plusplus',
        metrics: { speed: '8.0s', size: '4.2GB', rating: '4.7' },
        tags: ['Featured', '3D Generation'],
        category: 'make-3d',
        access: 'pro'
      }
    ]
  },
  {
    title: "Chat with images",
    id: "chat-with-images",
    description: "Ask language models about images",
    models: [
      {
        id: 16,
        title: 'LLaVA Mistral',
        description: 'Visual conversation and understanding',
        model: 'yorickvp/llava-v1.6-mistral-7b',
        metrics: { speed: '1.5s', size: '7.8GB', rating: '4.8' },
        tags: ['Featured', 'Visual Chat'],
        category: 'chat-with-images',
        access: 'pro'
      }
    ]
  },
  {
    title: "Face to images",
    id: "face-to-images",
    description: "Make realistic images of people instantly",
    models: [
      {
        id: 17,
        title: 'Instant ID',
        description: 'Instant face-based image generation',
        model: 'zsxkib/instant-id',
        metrics: { speed: '2.0s', size: '3.2GB', rating: '4.7' },
        tags: ['Featured', 'Face Generation'],
        category: 'face-to-images',
        access: 'pro'
      }
    ]
  },
  {
    title: "Extract text",
    id: "extract-text",
    description: "Optical character recognition (OCR) and text extraction",
    models: [
      {
        id: 18,
        title: 'Meta Nougat',
        description: 'Advanced document text extraction',
        model: 'awilliamson10/meta-nougat',
        metrics: { speed: '1.2s', size: '1.6GB', rating: '4.8' },
        tags: ['Featured', 'OCR'],
        category: 'extract-text',
        access: 'free'
      }
    ]
  },
  {
    title: "Get embeddings",
    id: "get-embeddings",
    description: "Models that generate embeddings from inputs",
    models: [
      {
        id: 19,
        title: 'ImageBind',
        description: 'Multi-modal embedding generation',
        model: 'daanelson/imagebind',
        metrics: { speed: '0.8s', size: '2.4GB', rating: '4.7' },
        tags: ['Featured', 'Embeddings'],
        category: 'get-embeddings',
        access: 'free'
      }
    ]
  },
  {
    title: "FLUX models",
    id: "flux-models",
    description: "The FLUX family of text-to-image models from Black Forest Labs",
    models: [
      {
        id: 20,
        title: 'FLUX Pro Ultra',
        description: 'Professional text-to-image generation',
        model: 'black-forest-labs/flux-1.1-pro-ultra',
        metrics: { speed: '2.5s', size: '6.9GB', rating: '4.9' },
        tags: ['Featured', 'FLUX'],
        category: 'flux-models',
        access: 'pro'
      }
    ]
  },
  {
    title: "Control generation",
    id: "control-generation",
    description: "Guide image generation with more than just text",
    models: [
      {
        id: 21,
        title: 'FLUX Canny Pro',
        description: 'Edge-guided image generation',
        model: 'black-forest-labs/flux-canny-pro',
        metrics: { speed: '2.8s', size: '7.2GB', rating: '4.8' },
        tags: ['Featured', 'Controlled Generation'],
        category: 'control-generation',
        access: 'pro'
      }
    ]
  }
];

const featuredModels = [
  {
    id: 1,
    title: 'Stable Diffusion XL',
    description: 'State-of-the-art text-to-image generation model',
    image: generatePlaceholderDataURL('#6b73ff'),
    metrics: {
      speed: '2.5s',
      size: '6.9GB',
      rating: '4.8',
    },
  },
  {
    id: 2,
    title: 'GPT-4 Turbo',
    description: 'Advanced language model for text generation and analysis',
    image: generatePlaceholderDataURL('#00bcd4'),
    metrics: {
      speed: '1.2s',
      size: '8.5GB',
      rating: '4.9',
    },
  },
  {
    id: 3,
    title: 'Claude 3 Opus',
    description: 'State-of-the-art language model with enhanced reasoning',
    image: generatePlaceholderDataURL('#4caf50'),
    metrics: {
      speed: '1.5s',
      size: '7.8GB',
      rating: '4.8',
    },
  },
  {
    id: 4,
    title: 'Midjourney v6',
    description: 'Advanced image generation with superior artistic quality',
    image: generatePlaceholderDataURL('#ff9800'),
    metrics: {
      speed: '3.0s',
      size: '7.2GB',
      rating: '4.9',
    },
  },
];

export default function ModelsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    access: new Set(["all"]),
    category: new Set([])
  });

  // Flatten all models into a single array
  const allModels = categories.flatMap(category => 
    category.models.map(model => ({
      ...model,
      categoryTitle: category.title
    }))
  );

  const filteredModels = allModels.filter(model => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        model.title.toLowerCase().includes(query) ||
        model.description.toLowerCase().includes(query) ||
        model.model.toLowerCase().includes(query)
      );
    }
    
    if (activeCategory !== "all") {
      return model.category === activeCategory;
    }
    
    return true;
  });

  return (
    <ModelsContainer>
      <FeaturedSection>
        <FeaturedTitle>Latest Models</FeaturedTitle>
        <ModelsCarousel models={featuredModels} />
      </FeaturedSection>

      <Header>
        <Title>Browse all models</Title>
        <Description>
          Explore our curated collection of state-of-the-art AI models for various tasks.
        </Description>
      </Header>

      <ContentLayout>
        <FiltersSection>
          <SearchInput 
            type="text"
            placeholder="Search models" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <FilterGroup>
            <FilterTitle>Access</FilterTitle>
            <FilterOption>
              <Checkbox type="checkbox" defaultChecked /> All
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Free
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Pro
            </FilterOption>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Categories</FilterTitle>
            <FilterOption>
              <Checkbox 
                type="checkbox"
                checked={activeCategory === "all"}
                onChange={() => setActiveCategory("all")}
              /> 
              All Categories
            </FilterOption>
            {categories.map((category) => (
              <FilterOption key={category.id}>
                <Checkbox 
                  type="checkbox"
                  checked={activeCategory === category.id}
                  onChange={() => setActiveCategory(category.id)}
                />
                {category.title}
              </FilterOption>
            ))}
          </FilterGroup>
        </FiltersSection>

        <ModelsGrid>
          {filteredModels.map((model) => (
            <ModelCardLink key={model.id} href={`/models/${encodeURIComponent(model.title.toLowerCase().replace(/\s+/g, '-'))}`}>
              <ModelCard
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <ModelImage />
                <ModelContent>
                  <ModelTitle>{model.title}</ModelTitle>
                  <ModelDescription>{model.description}</ModelDescription>
                  <ModelMetrics>
                    <span>⚡ {model.metrics.speed}</span>
                    <span>📦 {model.metrics.size}</span>
                    <span>⭐ {model.metrics.rating}</span>
                  </ModelMetrics>
                  <TagsContainer>
                    {model.tags.map((tag, index) => (
                      <Tag key={index}>
                        {tag}
                      </Tag>
                    ))}
                    <ModelTag>{model.title}</ModelTag>
                  </TagsContainer>
                </ModelContent>
              </ModelCard>
            </ModelCardLink>
          ))}
        </ModelsGrid>
      </ContentLayout>
    </ModelsContainer>
  );
} 