import styled from 'styled-components';

const Table = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
`;

const NewsCard = styled.div`
  flex: 1 1 calc(33.333% - 1rem);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
`;

export default function NewsTable() {
  const newsItems = [
    { title: "Mistral's Speedy New Assistant", description: "Mistral's speedy new assistant" },
    { title: "Google's Gemini 2.0 Goes Pro", description: "Gemini 2.0 goes Pro" },
    { title: "ByteDance Reveals 'OmniHuman' Model", description: "ByteDance unveils 'OmniHuman-1'" },
  ];

  return (
    <Table>
      {newsItems.map((item, index) => (
        <NewsCard key={index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </NewsCard>
      ))}
    </Table>
  );
} 