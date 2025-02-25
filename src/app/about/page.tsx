"use client";

import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 2rem;
  color: #fff;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #fff;
`;

const Content = styled.div`
  font-size: 1.2rem;
  color: #999;
  line-height: 1.6;
`;

export default function AboutPage() {
  return (
    <PageContainer>
      <Title>About Us</Title>
      <Content>
        <p>
          Welcome to Latest Models, your premier destination for discovering and implementing
          cutting-edge AI models. Our platform connects developers, researchers, and
          businesses with the latest advancements in artificial intelligence.
        </p>
        <br />
        <p>
          Our mission is to make AI accessible, understandable, and actionable for
          everyone. We carefully curate and document each model to ensure you have
          the best possible experience implementing AI in your projects.
        </p>
      </Content>
    </PageContainer>
  );
} 