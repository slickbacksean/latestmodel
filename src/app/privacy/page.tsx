"use client";

import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 2rem;
  color: #fff;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #fff;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  font-size: 1.1rem;
  color: #999;
  line-height: 1.6;

  p {
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

export default function PrivacyPage() {
  return (
    <PageContainer>
      <Title>Privacy Policy</Title>
      <Content>
        <Section>
          <SectionTitle>Introduction</SectionTitle>
          <p>
            At Latest Models, we take your privacy seriously. This Privacy Policy explains
            how we collect, use, and protect your personal information when you use
            our platform.
          </p>
        </Section>

        <Section>
          <SectionTitle>Information We Collect</SectionTitle>
          <ul>
            <li>Account information (name, email, password)</li>
            <li>Usage data and analytics</li>
            <li>API usage and model interaction data</li>
            <li>Payment information (processed securely through our payment providers)</li>
          </ul>
        </Section>

        <Section>
          <SectionTitle>How We Use Your Information</SectionTitle>
          <ul>
            <li>To provide and improve our services</li>
            <li>To personalize your experience</li>
            <li>To process your transactions</li>
            <li>To communicate with you about our services</li>
            <li>To ensure platform security and prevent abuse</li>
          </ul>
        </Section>

        <Section>
          <SectionTitle>Data Protection</SectionTitle>
          <p>
            We implement industry-standard security measures to protect your data.
            Your information is encrypted in transit and at rest, and we regularly
            review our security practices.
          </p>
        </Section>
      </Content>
    </PageContainer>
  );
} 