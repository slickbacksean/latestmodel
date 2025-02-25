"use client";

import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const BlogCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const BlogExcerpt = styled.p`
  color: #999;
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
`;

const blogPosts = [
  {
    title: "The Future of AI: What's Next in 2024",
    excerpt: "Explore the upcoming trends and innovations in artificial intelligence that will shape the industry in 2024.",
    date: "Mar 15, 2024",
    readTime: "5 min read",
  },
  {
    title: "Understanding Large Language Models",
    excerpt: "A comprehensive guide to how large language models work and their impact on various industries.",
    date: "Mar 14, 2024",
    readTime: "7 min read",
  },
  {
    title: "AI Ethics and Governance",
    excerpt: "Discussing the importance of ethical considerations in AI development and deployment.",
    date: "Mar 13, 2024",
    readTime: "6 min read",
  },
  {
    title: "Optimizing AI Model Performance",
    excerpt: "Learn about the latest techniques and best practices for improving AI model efficiency.",
    date: "Mar 12, 2024",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <PageContainer>
      <Title>Blog</Title>
      <BlogGrid>
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <BlogImage />
            <BlogContent>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <BlogMeta>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </BlogMeta>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </PageContainer>
  );
} 