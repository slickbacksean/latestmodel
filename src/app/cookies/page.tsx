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

const CookieTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #999;
`;

export default function CookiesPage() {
  return (
    <PageContainer>
      <Title>Cookie Policy</Title>
      <Content>
        <Section>
          <SectionTitle>What Are Cookies</SectionTitle>
          <p>
            Cookies are small text files that are placed on your device when you
            visit our website. They help us provide you with a better experience
            and enable certain features to function properly.
          </p>
        </Section>

        <Section>
          <SectionTitle>Types of Cookies We Use</SectionTitle>
          <CookieTable>
            <thead>
              <tr>
                <Th>Type</Th>
                <Th>Purpose</Th>
                <Th>Duration</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>Essential</Td>
                <Td>Required for basic site functionality</Td>
                <Td>Session</Td>
              </tr>
              <tr>
                <Td>Analytics</Td>
                <Td>Help us understand how visitors use our site</Td>
                <Td>2 years</Td>
              </tr>
              <tr>
                <Td>Preferences</Td>
                <Td>Remember your settings and choices</Td>
                <Td>1 year</Td>
              </tr>
              <tr>
                <Td>Marketing</Td>
                <Td>Track marketing effectiveness and personalization</Td>
                <Td>30 days</Td>
              </tr>
            </tbody>
          </CookieTable>
        </Section>

        <Section>
          <SectionTitle>Managing Cookies</SectionTitle>
          <p>
            You can control and/or delete cookies as you wish. You can delete all
            cookies that are already on your computer and you can set most browsers
            to prevent them from being placed.
          </p>
          <ul>
            <li>Browser settings can be adjusted to reject cookies</li>
            <li>Individual cookies can be deleted from your browser</li>
            <li>Third-party tools are available for managing cookies</li>
          </ul>
        </Section>
      </Content>
    </PageContainer>
  );
} 