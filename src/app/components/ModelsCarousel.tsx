import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
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

const ModelCard = styled(motion.div)`
  min-width: 300px;
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

interface Model {
  id: number;
  title: string;
  description: string;
  image: string;
  metrics: {
    speed: string;
    size: string;
    rating: string;
  };
}

interface ModelsCarouselProps {
  models: Model[];
}

export default function ModelsCarousel({ models }: ModelsCarouselProps) {
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleModelClick = (model: Model) => {
    window.location.href = `/models/${encodeURIComponent(model.title.toLowerCase().replace(/\s+/g, '-'))}`;
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

    startAnimation();
  }, [controls, isPaused]);

  // Duplicate models array for seamless infinite scroll
  const duplicatedModels = [...models, ...models, ...models];

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
        {duplicatedModels.map((model, index) => (
          <div 
            key={`${model.id}-${index}`}
            onClick={() => handleModelClick(model)}
          >
            <ModelCard 
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <ModelImage>
                <Image
                  src={model.image}
                  alt={model.title}
                  width={400}
                  height={160}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </ModelImage>
              <ModelContent>
                <ModelTitle>{model.title}</ModelTitle>
                <ModelDescription>{model.description}</ModelDescription>
                <ModelMetrics>
                  <span>⚡ {model.metrics.speed}</span>
                  <span>📦 {model.metrics.size}</span>
                  <span>⭐ {model.metrics.rating}</span>
                </ModelMetrics>
              </ModelContent>
            </ModelCard>
          </div>
        ))}
      </CarouselTrack>
    </CarouselContainer>
  );
} 