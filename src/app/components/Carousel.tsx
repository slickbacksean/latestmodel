import styled from 'styled-components';
import { useRef } from 'react';

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem 0;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const Card = styled.div`
  flex: 0 0 auto;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const models = [
    { title: 'AI Model 1', description: 'Brief description of the AI model.' },
    { title: 'AI Model 2', description: 'Brief description of the AI model.' },
    { title: 'AI Model 3', description: 'Brief description of the AI model.' },
    { title: 'AI Model 4', description: 'Brief description of the AI model.' },
  ];

  return (
    <CarouselContainer ref={carouselRef}>
      {models.map((model, index) => (
        <Card key={index}>
          <h3>{model.title}</h3>
          <p>{model.description}</p>
        </Card>
      ))}
    </CarouselContainer>
  );
} 