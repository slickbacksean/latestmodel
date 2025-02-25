"use client";

import styled from 'styled-components';
import { motion } from 'framer-motion';

const CommunityContainer = styled.div`
  padding: 2rem;
  color: #fff;
`;

const Header = styled.div`
  margin-bottom: 4rem;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #999;
  max-width: 600px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PostCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: bold;
  color: #fff;
`;

const PostDate = styled.span`
  font-size: 0.9rem;
  color: #999;
`;

const PostContent = styled.div`
  margin-bottom: 1rem;
  color: #fff;
`;

const PostActions = styled.div`
  display: flex;
  gap: 1rem;
  color: #999;
  font-size: 0.9rem;
`;

const SidebarCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff;
`;

const LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  &:last-child {
    border-bottom: none;
  }
`;

const TrendingTopic = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: #fff;
  margin: 0.25rem;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const posts = [
  {
    id: 1,
    author: 'John Doe',
    date: '2024-03-15',
    content: 'Just released a new tutorial on using Stable Diffusion for character design. Check it out!',
    likes: 42,
    comments: 12,
  },
  {
    id: 2,
    author: 'Jane Smith',
    date: '2024-03-14',
    content: 'Looking for collaborators on an AI-powered game development project. DM if interested!',
    likes: 38,
    comments: 15,
  },
];

const topContributors = [
  { name: 'John Doe', contributions: 156 },
  { name: 'Jane Smith', contributions: 143 },
  { name: 'Bob Johnson', contributions: 128 },
  { name: 'Alice Brown', contributions: 112 },
];

const trendingTopics = [
  '#StableDiffusion',
  '#GPT4',
  '#AIArt',
  '#MachineLearning',
  '#ComputerVision',
  '#NLP',
  '#DeepLearning',
  '#AIEthics',
];

export default function CommunityPage() {
  return (
    <CommunityContainer>
      <Header>
        <Title>Community</Title>
        <Description>
          Connect with AI enthusiasts, share your projects, and learn from others in the community.
        </Description>
      </Header>

      <ContentGrid>
        <MainContent>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <PostHeader>
                <Avatar />
                <UserInfo>
                  <Username>{post.author}</Username>
                  <PostDate>{post.date}</PostDate>
                </UserInfo>
              </PostHeader>
              <PostContent>
                <p>{post.content}</p>
              </PostContent>
              <PostActions>
                <span>❤️ {post.likes} Likes</span>
                <span>💬 {post.comments} Comments</span>
                <span>↗️ Share</span>
              </PostActions>
            </PostCard>
          ))}
        </MainContent>

        <Sidebar>
          <SidebarCard>
            <SidebarTitle>Top Contributors</SidebarTitle>
            {topContributors.map((contributor, index) => (
              <LeaderboardItem key={index}>
                <Avatar />
                <div>
                  <Username>{contributor.name}</Username>
                  <span style={{ color: '#999', fontSize: '0.9rem' }}>
                    {contributor.contributions} contributions
                  </span>
                </div>
              </LeaderboardItem>
            ))}
          </SidebarCard>

          <SidebarCard>
            <SidebarTitle>Trending Topics</SidebarTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {trendingTopics.map((topic, index) => (
                <TrendingTopic key={index}>{topic}</TrendingTopic>
              ))}
            </div>
          </SidebarCard>
        </Sidebar>
      </ContentGrid>
    </CommunityContainer>
  );
} 