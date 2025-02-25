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

export default function TermsPage() {
  return (
    <PageContainer>
      <Title>Terms of Service</Title>
      <Content>
        <Section>
          <SectionTitle>1. Acceptance of Terms</SectionTitle>
          <p>
            By accessing and using Latest Models, you agree to be bound by these Terms
            of Service and all applicable laws and regulations.
          </p>
        </Section>

        <Section>
          <SectionTitle>2. Use License</SectionTitle>
          <p>
            We grant you a limited, non-exclusive, non-transferable license to use
            our platform for personal and commercial purposes in accordance with
            these terms.
          </p>
          <ul>
            <li>API usage is subject to rate limits and fair use policies</li>
            <li>Model outputs must comply with our content guidelines</li>
            <li>Resale of API access is prohibited without explicit permission</li>
          </ul>
        </Section>

        <Section>
          <SectionTitle>3. User Obligations</SectionTitle>
          <ul>
            <li>Maintain the security of your account credentials</li>
            <li>Use the platform in compliance with all applicable laws</li>
            <li>Respect intellectual property rights</li>
            <li>Do not attempt to reverse engineer our services</li>
          </ul>
        </Section>

        <Section>
          <SectionTitle>4. Service Modifications</SectionTitle>
          <p>
            We reserve the right to modify, suspend, or discontinue any part of our
            service at any time. We will provide notice of significant changes when
            possible.
          </p>
        </Section>
      </Content>
    </PageContainer>
  );
} 