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

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const JobCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const JobLocation = styled.div`
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const JobDescription = styled.p`
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const ApplyButton = styled.button`
  background: transparent;
  color: #6b73ff;
  padding: 0.5rem 1rem;
  border: 1px solid #6b73ff;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(107, 115, 255, 0.1);
  }
`;

const jobs = [
  {
    title: "Senior AI Engineer",
    location: "Remote",
    description: "Join our team to develop and implement cutting-edge AI models.",
  },
  {
    title: "Product Manager",
    location: "New York, NY",
    description: "Lead the development of our AI platform and shape the future of AI tools.",
  },
  {
    title: "ML Operations Engineer",
    location: "Remote",
    description: "Build and maintain our ML infrastructure and deployment pipelines.",
  },
  {
    title: "Technical Writer",
    location: "Remote",
    description: "Create comprehensive documentation for our AI models and tools.",
  },
];

export default function CareersPage() {
  return (
    <PageContainer>
      <Title>Careers</Title>
      <Content>
        <p>
          Join our team and help shape the future of AI. We're looking for
          passionate individuals who want to make AI accessible to everyone.
        </p>
      </Content>
      <JobsGrid>
        {jobs.map((job, index) => (
          <JobCard key={index}>
            <JobTitle>{job.title}</JobTitle>
            <JobLocation>{job.location}</JobLocation>
            <JobDescription>{job.description}</JobDescription>
            <ApplyButton>Apply Now</ApplyButton>
          </JobCard>
        ))}
      </JobsGrid>
    </PageContainer>
  );
} 