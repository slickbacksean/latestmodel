"use client";

import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from './components/NavBar';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import NewsTable from './components/NewsTable';
import TutorialsTable from './components/TutorialsTable';
import ModelsCarousel from './components/ModelsCarousel';
import ToolsCarousel from './components/ToolsCarousel';
import { generatePlaceholderDataURL } from './components/Placeholder';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const HomeContainer = styled.div`
  padding: 2rem;
  color: #fff;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin: 4rem 0 2rem;
  
  &:first-of-type {
    margin-top: 2rem;
  }
`;

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

const ArticleCard = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16/9;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
`;

const ArticleImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  }
`;

const ArticleContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  z-index: 1;
`;

const ArticleTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff;
  line-height: 1.3;
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #999;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`;

const Subtitle = styled.span`
  color: #999;
  font-size: 0.9rem;
  display: block;
  margin-top: 0.5rem;
`;

const ModelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
`;

const ModelCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
`;

const ModelImage = styled.div`
  width: 100%;
  height: 160px;
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
  }
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
`;

const ModelMetrics = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled(motion.tr)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #fff;
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  color: #999;
  font-weight: normal;
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
`;

const ToolCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
`;

const ToolImage = styled.div`
  width: 100%;
  height: 160px;
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
  }
`;

const ToolContent = styled.div`
  padding: 1.5rem;
`;

const ToolIcon = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
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
`;

const ToolMetrics = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const MainContent = styled.div`
  background: transparent;
  position: relative;
  z-index: 1;
`;

const NewsletterLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const TutorialLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const NewsletterRow = styled(motion.tr)`
  cursor: pointer;
`;

const NewsletterCell = styled.td`
  padding: 1rem;
  color: #fff;
`;

const TutorialRow = styled(motion.tr)`
  cursor: pointer;
`;

const TutorialCell = styled.td`
  padding: 1rem;
  color: #fff;
`;

const articles = [
  {
    id: 1,
    title: "xAI's 'smartest AI on Earth' arrives",
    subtitle: "PLUS: Mistral releases specialized regional AI model",
    author: "Rowan Cheung",
    image: "/placeholder1.jpg",
  },
  {
    id: 2,
    title: "Meta joins the robotics race",
    subtitle: "PLUS: Perplexity undercuts OpenAI with Deep Research feature",
    author: "Rowan Cheung",
    image: "/placeholder2.jpg",
  },
  {
    id: 3,
    title: "Anthropic's hybrid AI model is coming",
    subtitle: "PLUS: YouTube brings state-of-the-art AI video to Shorts",
    author: "Rowan Cheung",
    image: "/placeholder3.jpg",
  },
  {
    id: 4,
    title: "OpenAI's new GPT-5 roadmap",
    subtitle: "PLUS: Adobe launches IP-safe AI video generator",
    author: "Rowan Cheung",
    image: "/placeholder4.jpg",
  },
  {
    id: 5,
    title: "AI tensions rise on global stage",
    subtitle: "PLUS: Perplexity's new ultra-fast Sonar upgrade",
    author: "Rowan Cheung",
    image: "/placeholder5.jpg",
  },
  {
    id: 6,
    title: "Elon's $97B OpenAI offer",
    subtitle: "PLUS: OpenAI makes advertising debut at the Big Game",
    author: "Rowan Cheung",
    image: "/placeholder6.jpg",
  },
];

const models = [
  {
    id: 1,
    title: 'Stable Diffusion XL',
    description: 'State-of-the-art text-to-image generation model',
    image: generatePlaceholderDataURL('#6b73ff'), // Purple
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
    image: generatePlaceholderDataURL('#00bcd4'), // Cyan
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
    image: generatePlaceholderDataURL('#4caf50'), // Green
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
    image: generatePlaceholderDataURL('#ff9800'), // Orange
    metrics: {
      speed: '3.0s',
      size: '7.2GB',
      rating: '4.9',
    },
  },
];

const newsletters = [
  {
    id: 1,
    title: "Latest AI Developments",
    description: "Weekly roundup of AI news and breakthroughs",
    date: "Mar 15, 2024",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Model Training Tips",
    description: "Best practices for training AI models",
    date: "Mar 14, 2024",
    readTime: "8 min"
  },
  {
    id: 3,
    title: "AI Tools Showcase",
    description: "New and trending AI tools this week",
    date: "Mar 13, 2024",
    readTime: "6 min"
  }
];

const tutorials = [
  {
    id: 1,
    title: "Getting Started with AI Models",
    description: "Learn the basics of working with AI models",
    category: "Beginner",
    difficulty: "Easy",
    duration: "30 min"
  },
  {
    id: 2,
    title: "Advanced Model Training",
    description: "Deep dive into model training techniques",
    category: "Advanced",
    difficulty: "Hard",
    duration: "60 min"
  },
  {
    id: 3,
    title: "AI Tools Integration",
    description: "How to integrate AI tools in your workflow",
    category: "Intermediate",
    difficulty: "Medium",
    duration: "45 min"
  }
];

const tools = [
  {
    id: 1,
    title: 'AI Image Editor',
    description: 'Edit and enhance images using advanced AI algorithms',
    image: generatePlaceholderDataURL('#e91e63'), // Pink
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
    image: generatePlaceholderDataURL('#00bcd4'), // Cyan
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
    image: generatePlaceholderDataURL('#ffc107'), // Yellow
    icon: '📝',
    metrics: {
      users: '5K+',
      rating: '4.6',
    },
  },
];

export default function HomePage() {
  const router = useRouter();

  const handleNewsletterClick = (id: number) => {
    router.push(`/newsletters/${id}`);
  };

  const handleTutorialClick = (id: number) => {
    router.push(`/tutorials/${id}`);
  };

  return (
    <>
      <Navigation />
      <Hero />
      <MainContent>
        <HomeContainer>
          <ArticleGrid>
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                whileHover={{
                  y: -5,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)'
                }}
                transition={{ duration: 0.2 }}
              >
                <ArticleImage>
                  {/* We'll add actual images later */}
                </ArticleImage>
                <ArticleContent>
                  <ArticleTitle>
                    {article.title}
                    <Subtitle>{article.subtitle}</Subtitle>
                  </ArticleTitle>
                  <ArticleMeta>
                    <AuthorInfo>
                      <AuthorAvatar />
                      <span>{article.author}</span>
                    </AuthorInfo>
                  </ArticleMeta>
                </ArticleContent>
              </ArticleCard>
            ))}
          </ArticleGrid>
          
          <SectionTitle>Latest Models</SectionTitle>
          <ModelsCarousel models={models} />
          
          <SectionTitle>Latest Newsletters</SectionTitle>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Title</TableHeader>
                  <TableHeader>Description</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Read Time</TableHeader>
                </tr>
              </thead>
              <tbody>
                {newsletters.map((newsletter, index) => (
                  <tr
                    key={index}
                    onClick={() => handleNewsletterClick(newsletter.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <NewsletterCell>{newsletter.title}</NewsletterCell>
                    <NewsletterCell>{newsletter.description}</NewsletterCell>
                    <NewsletterCell>{newsletter.date}</NewsletterCell>
                    <NewsletterCell>{newsletter.readTime}</NewsletterCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          
          <SectionTitle>Latest Tools</SectionTitle>
          <ToolsCarousel tools={tools} />
          
          <SectionTitle>Latest Tutorials</SectionTitle>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Title</TableHeader>
                  <TableHeader>Description</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Difficulty</TableHeader>
                  <TableHeader>Duration</TableHeader>
                </tr>
              </thead>
              <tbody>
                {tutorials.map((tutorial, index) => (
                  <tr
                    key={index}
                    onClick={() => handleTutorialClick(tutorial.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TutorialCell>{tutorial.title}</TutorialCell>
                    <TutorialCell>{tutorial.description}</TutorialCell>
                    <TutorialCell>{tutorial.category}</TutorialCell>
                    <TutorialCell>{tutorial.difficulty}</TutorialCell>
                    <TutorialCell>{tutorial.duration}</TutorialCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </HomeContainer>
      </MainContent>
    </>
  );
}
