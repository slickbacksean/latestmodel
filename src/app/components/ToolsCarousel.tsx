import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, HTMLMotionProps } from 'framer-motion';
import Image from 'next/image';

const CarouselContainer = styled(motion.div)`
  overflow: hidden;
  width: 100%;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 1rem 0;
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
  width: fit-content;
  gap: 1.5rem;
  padding: 0 0.75rem;
`;

const ToolCard = styled(motion.div)<HTMLMotionProps<"div">>`
  min-width: 300px;
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

interface Tool {
  id: number;
  title: string;
  description: string;
  image: string;
  metrics: {
    users: string;
    rating: string;
  };
}

interface ToolsCarouselProps {
  tools: Tool[];
}

export default function ToolsCarousel({ tools }: ToolsCarouselProps) {
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleToolClick = (tool: Tool) => {
    window.location.href = `/tools/${tool.id}`;
  };

  useEffect(() => {
    const startAnimation = async () => {
      if (!trackRef.current) return;

      const singleSetWidth = trackRef.current.scrollWidth / 3;

      if (isPaused) {
        controls.stop();
      } else {
        await controls.start({
          x: -singleSetWidth,
          transition: {
            duration: 50,
            ease: "linear",
            repeat: Infinity,
          },
        });
      }
    };

    // Start animation immediately
    startAnimation();
  }, [controls, isPaused]);

  // Duplicate tools array for seamless infinite scroll
  const duplicatedTools = [...tools, ...tools, ...tools];

  return (
    <CarouselContainer
      onHoverStart={() => setIsPaused(true)}
      onHoverEnd={() => setIsPaused(false)}
    >
      <CarouselTrack 
        ref={trackRef} 
        animate={controls} 
        initial={{ x: 0 }}
      >
        {duplicatedTools.map((tool, index) => (
          <div 
            key={`${tool.id}-${index}`}
            onClick={() => handleToolClick(tool)}
          >
            <ToolCard 
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <ToolImage>
                <Image
                  src={tool.image}
                  alt={tool.title}
                  width={400}
                  height={160}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </ToolImage>
              <ToolContent>
                <ToolTitle>{tool.title}</ToolTitle>
                <ToolDescription>{tool.description}</ToolDescription>
                <ToolMetrics>
                  <span>👥 {tool.metrics.users}</span>
                  <span>⭐ {tool.metrics.rating}</span>
                </ToolMetrics>
              </ToolContent>
            </ToolCard>
          </div>
        ))}
      </CarouselTrack>
    </CarouselContainer>
  );
} 