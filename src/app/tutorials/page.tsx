"use client";

import styled from 'styled-components';
import { motion } from 'framer-motion';

const TutorialsContainer = styled.div`
  padding: 2rem;
  color: #fff;
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

const TutorialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TutorialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const TutorialImage = styled.div`
  width: 100%;
  height: 160px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
`;

const TutorialContent = styled.div`
  padding: 1.5rem;
`;

const TutorialTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const TutorialDescription = styled.p`
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const TutorialMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
`;

const Badge = styled.span`
  background: rgba(107, 115, 255, 0.1);
  color: #6b73ff;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
`;

const tutorials = [
  {
    id: 1,
    title: "Build an app with AI coding tool Create",
    description: "A walkthrough on how to build an app using Create",
    difficulty: "Beginner",
    duration: "15 min",
    category: "Development",
    isPro: true,
  },
  {
    id: 2,
    title: "Monitoring and improving the sales pipeline",
    description: "Monitor your sales performance and engagement data to create insightful reports using Claude.",
    difficulty: "Intermediate",
    duration: "20 min",
    category: "Business",
    isPro: true,
  },
  {
    id: 3,
    title: "Enhance your non-fiction writing process",
    description: "Build a repeatable system using ChatGPT projects to organize notes and write non-fiction first drafts.",
    difficulty: "Beginner",
    duration: "30 min",
    category: "Writing",
    isPro: true,
  },
  {
    id: 4,
    title: "Analyse Reddit trends with AI",
    description: "Identify the latest trends, topics, and themes going viral on Reddit with AI.",
    difficulty: "Intermediate",
    duration: "25 min",
    category: "Analytics",
    isPro: false,
  },
  {
    id: 5,
    title: "Turn videos into social clips",
    description: "Learn how to quickly turn long videos into sleek clips for social media with OpusClip.",
    difficulty: "Beginner",
    duration: "15 min",
    category: "Content",
    isPro: true,
  },
  {
    id: 6,
    title: "Build an automated patient feedback system",
    description: "Create an AI-powered workflow that collects, analyzes, and summarizes feedback after your meetings and appointments.",
    difficulty: "Advanced",
    duration: "45 min",
    category: "Healthcare",
    isPro: true,
  },
];

export default function TutorialsPage() {
  return (
    <TutorialsContainer>
      <Header>
        <Title>Browse all courses & tutorials</Title>
        <Description>
          Learn how to use AI models and tools with step-by-step tutorials from the community.
        </Description>
      </Header>

      <ContentLayout>
        <FiltersSection>
          <SearchInput type="text" placeholder="Search tutorials and courses" />
          
          <FilterGroup>
            <FilterTitle>Type</FilterTitle>
            <FilterOption>
              <Checkbox type="checkbox" defaultChecked /> All
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Courses
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Tutorials
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
            <FilterTitle>Difficulty</FilterTitle>
            <FilterOption>
              <Checkbox type="checkbox" /> Beginner
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Intermediate
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Advanced
            </FilterOption>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Categories</FilterTitle>
            <FilterOption>
              <Checkbox type="checkbox" /> Development
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Business
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Writing
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Analytics
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Content
            </FilterOption>
            <FilterOption>
              <Checkbox type="checkbox" /> Healthcare
            </FilterOption>
          </FilterGroup>
        </FiltersSection>

        <TutorialsGrid>
          {tutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <TutorialImage />
              <TutorialContent>
                <TutorialTitle>{tutorial.title}</TutorialTitle>
                <TutorialDescription>{tutorial.description}</TutorialDescription>
                <TutorialMeta>
                  <div>
                    <Badge>{tutorial.difficulty}</Badge>
                    {tutorial.isPro && (
                      <Badge style={{ marginLeft: '0.5rem', background: 'rgba(255, 59, 48, 0.1)', color: '#ff3b30' }}>
                        Pro
                      </Badge>
                    )}
                  </div>
                  <span>⏱️ {tutorial.duration}</span>
                </TutorialMeta>
              </TutorialContent>
            </TutorialCard>
          ))}
        </TutorialsGrid>
      </ContentLayout>
    </TutorialsContainer>
  );
} 