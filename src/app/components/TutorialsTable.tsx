import styled from 'styled-components';

const Table = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
`;

const TutorialCard = styled.div`
  flex: 1 1 calc(33.333% - 1rem);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
`;

export default function TutorialsTable() {
  const tutorials = [
    { title: "Create a website in seconds", description: "A step-by-step guide on creating websites in seconds." },
    { title: "Generate charts from your data", description: "Learn how to use ChatGPT to analyze and visualize data." },
    { title: "Use Gemini to write your emails", description: "Discover how to unlock Google Gemini's 'Help me write' AI features." },
  ];

  return (
    <Table>
      {tutorials.map((tutorial, index) => (
        <TutorialCard key={index}>
          <h3>{tutorial.title}</h3>
          <p>{tutorial.description}</p>
        </TutorialCard>
      ))}
    </Table>
  );
} 