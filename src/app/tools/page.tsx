"use client";

import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import ToolsCarousel from '../components/ToolsCarousel';
import { generatePlaceholderDataURL } from '../components/Placeholder';

const ToolsContainer = styled.div`
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

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  align-content: start;
`;

const ToolCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const ToolImage = styled.div`
  width: 100%;
  height: 160px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
`;

const ToolContent = styled.div`
  padding: 1.5rem;
`;

const ToolTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const ToolDescription = styled.p`
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span<{ variant?: string }>`
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

const CategoryNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryLink = styled.a<{ isActive?: boolean }>`
  color: ${props => props.isActive ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.isActive ? '#fff' : 'transparent'};
    transition: all 0.2s;
  }

  &:hover {
    color: #fff;
  }
`;

const TrendingTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: #ff3b30;
  font-weight: 500;
`;

const categories = [
  { label: "🔥 Trending", id: "trending" },
  { label: "Generate images", id: "generate-images" },
  { label: "Generate videos", id: "generate-videos" },
  { label: "Caption images", id: "caption-images" },
  { label: "Transcribe speech", id: "transcribe-speech" },
  { label: "Generate text", id: "generate-text" },
  { label: "Upscale images", id: "upscale-images" },
  { label: "Official models", id: "official-models" },
  { label: "Restore images", id: "restore-images" },
  { label: "Enhance videos", id: "enhance-videos" },
  { label: "Generate speech", id: "generate-speech" },
  { label: "Caption videos", id: "caption-videos" },
  { label: "Remove backgrounds", id: "remove-backgrounds" },
  { label: "Handy tools", id: "handy-tools" },
  { label: "Detect objects", id: "detect-objects" },
  { label: "Generate music", id: "generate-music" },
  { label: "Sing with voices", id: "sing-with-voices" },
  { label: "Make 3D stuff", id: "make-3d" },
  { label: "Chat with images", id: "chat-with-images" },
  { label: "Face to images", id: "face-to-images" },
  { label: "Extract text", id: "extract-text" },
  { label: "Get embeddings", id: "get-embeddings" },
  { label: "FLUX models", id: "flux-models" },
  { label: "FLUX fine-tunes", id: "flux-fine-tunes" },
  { label: "Control generation", id: "control-generation" },
  { label: "Edit images", id: "edit-images" }
];

const tools = [
  {
    id: 1,
    title: 'Flux Pro Ultra',
    description: 'State-of-the-art text-to-image generation model',
    image: '/placeholder1.jpg',
    category: 'generate-images',
    tags: ['Featured', 'Image Generation'],
    model: 'black-forest-labs/flux-1.1-pro-ultra'
  },
  {
    id: 2,
    title: 'Imagen-3',
    description: 'Google\'s advanced image generation model',
    image: '/placeholder2.jpg',
    category: 'generate-images',
    tags: ['Featured', 'Image Generation'],
    model: 'google/imagen-3'
  },
  {
    id: 3,
    title: 'Ray-2 720p',
    description: 'High-quality video generation model',
    image: '/placeholder3.jpg',
    category: 'generate-videos',
    tags: ['Featured', 'Video Generation'],
    model: 'luma/ray-2-720p'
  },
  {
    id: 4,
    title: 'LLaVA-13B',
    description: 'Advanced image understanding and captioning',
    image: '/placeholder4.jpg',
    category: 'caption-images',
    tags: ['Featured', 'AI Vision'],
    model: 'yorickvp/llava-13b'
  },
  {
    id: 5,
    title: 'Claude 3.5 Sonnet',
    description: 'State-of-the-art language model for text generation',
    image: '/placeholder5.jpg',
    category: 'generate-text',
    tags: ['Featured', 'Language Model'],
    model: 'anthropic/claude-3.5-sonnet'
  },
  {
    id: 6,
    title: 'Real-ESRGAN',
    description: 'Professional image upscaling model',
    image: '/placeholder6.jpg',
    category: 'upscale-images',
    tags: ['Featured', 'Image Enhancement'],
    model: 'nightmareai/real-esrgan'
  },
  {
    id: 7,
    title: 'WhisperX',
    description: 'Fast and accurate speech transcription',
    image: '/placeholder7.jpg',
    category: 'transcribe-speech',
    tags: ['Featured', 'Speech Recognition'],
    model: 'victor-upmeet/whisperx'
  },
  {
    id: 8,
    title: 'Kokoro TTS',
    description: 'High-quality text-to-speech synthesis',
    image: '/placeholder8.jpg',
    category: 'generate-speech',
    tags: ['Featured', 'Speech Synthesis'],
    model: 'jaaari/kokoro-82m'
  },
  {
    id: 9,
    title: 'Remove BG',
    description: 'Professional background removal tool',
    image: '/placeholder9.jpg',
    category: 'remove-backgrounds',
    tags: ['Featured', 'Image Editing'],
    model: 'lucataco/remove-bg'
  },
  {
    id: 10,
    title: 'MusicGen',
    description: 'Advanced AI music generation',
    image: '/placeholder10.jpg',
    category: 'generate-music',
    tags: ['Featured', 'Music Generation'],
    model: 'meta/musicgen'
  }
];

const featuredTools = [
  {
    id: 1,
    title: 'AI Image Editor',
    description: 'Edit and enhance images using advanced AI algorithms',
    image: generatePlaceholderDataURL('#e91e63'),
    icon: '🎨',
    metrics: {
      users: '10K+',
      rating: '4.8',
    },
  },
  {
    id: 2,
    title: 'Background Remover',
    description: 'Remove backgrounds from images with one click',
    image: generatePlaceholderDataURL('#00bcd4'),
    icon: '✂️',
    metrics: {
      users: '8K+',
      rating: '4.7',
    },
  },
  {
    id: 3,
    title: 'Text Analyzer',
    description: 'Analyze text sentiment and extract key insights',
    image: generatePlaceholderDataURL('#ffc107'),
    icon: '📝',
    metrics: {
      users: '5K+',
      rating: '4.6',
    },
  },
  {
    id: 4,
    title: 'Video Enhancer',
    description: 'Improve video quality with AI upscaling',
    image: generatePlaceholderDataURL('#4caf50'),
    icon: '🎥',
    metrics: {
      users: '7K+',
      rating: '4.8',
    },
  },
];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    type: new Set(["all"]),
    access: new Set(["all"]),
    category: new Set([])
  });

  const filteredTools = tools.filter(tool => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.model.toLowerCase().includes(query)
      );
    }
    
    if (activeCategory === "trending") {
      return tool.tags.includes("Featured");
    }
    
    return tool.category === activeCategory;
  });

  return (
    <ToolsContainer>
      <FeaturedSection>
        <FeaturedTitle>Latest Tools</FeaturedTitle>
        <ToolsCarousel tools={featuredTools} />
      </FeaturedSection>

      <Header>
        <Title>Browse all models & tools</Title>
        <Description>
          Discover and implement cutting-edge AI models and tools for your projects.
        </Description>
      </Header>

      <ContentLayout>
        <FiltersSection>
          <SearchInput 
            type="text" 
            placeholder="Search models and tools" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <FilterGroup>
            <FilterTitle>Type</FilterTitle>
            <FilterOption>
              <Checkbox type="checkbox" defaultChecked /> All
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Models
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Tools
            </FilterOption>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Access</FilterTitle>
            <FilterOption>
              <Checkbox type="checkbox" /> Free
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Pro
            </FilterOption>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Categories</FilterTitle>
            {categories.slice(1).map((category) => (
              <FilterOption key={category.id}>
                <Checkbox 
                  type="checkbox"
                  checked={activeCategory === category.id}
                  onChange={() => setActiveCategory(category.id)}
                />
                {category.label}
              </FilterOption>
            ))}
          </FilterGroup>
        </FiltersSection>

        <ToolsGrid>
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ToolImage />
              <ToolContent>
                <ToolTitle>{tool.title}</ToolTitle>
                <ToolDescription>{tool.description}</ToolDescription>
                <TagsContainer>
                  {tool.tags.map((tag, index) => (
                    <Tag key={index}>
                      {tag}
                    </Tag>
                  ))}
                  <ModelTag>{tool.model}</ModelTag>
                </TagsContainer>
              </ToolContent>
            </ToolCard>
          ))}
        </ToolsGrid>
      </ContentLayout>
    </ToolsContainer>
  );
} 