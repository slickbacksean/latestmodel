import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: #fff;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff;
  max-width: 800px;
  text-shadow: 0 0 10px rgba(107, 115, 255, 0.3),
               0 0 20px rgba(107, 115, 255, 0.2),
               0 0 30px rgba(107, 115, 255, 0.1);
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 1.5rem;
  max-width: 600px;
  text-shadow: 0 0 10px rgba(107, 115, 255, 0.2),
               0 0 20px rgba(107, 115, 255, 0.1);
`;

const SignupContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(107, 115, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(107, 115, 255, 0.2);
  box-shadow: inset 0 0 30px rgba(107, 115, 255, 0.15),
              0 0 30px rgba(107, 115, 255, 0.15);
  backdrop-filter: blur(5px);
`;

const EmailInput = styled.input`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(107, 115, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  width: 300px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  &:focus {
    outline: none;
    border-color: #6b73ff;
    background: rgba(107, 115, 255, 0.1);
    box-shadow: 0 0 15px rgba(107, 115, 255, 0.2);
  }
`;

const JoinButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: #6b73ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 0 15px rgba(107, 115, 255, 0.3);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  
  &:hover {
    background: #8388ff;
    box-shadow: 0 0 20px rgba(107, 115, 255, 0.4);
  }
`;

export default function Hero() {
  return (
    <HeroSection>
      <Title>
        Learn AI in 5 minutes a day.
      </Title>
      <Description>
        Get the latest AI news, understand why it matters, and learn how to apply it in your work.
      </Description>
      <SignupContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{
          background: "rgba(107, 115, 255, 0.08)",
          boxShadow: [
            "inset 0 0 30px rgba(107, 115, 255, 0.15), 0 0 30px rgba(107, 115, 255, 0.15)",
            "inset 0 0 35px rgba(107, 115, 255, 0.2), 0 0 40px rgba(107, 115, 255, 0.2)"
          ]
        }}
      >
        <EmailInput type="email" placeholder="Enter your email" />
        <JoinButton
          whileHover={{ 
            y: -2, 
            boxShadow: "0 0 25px rgba(107, 115, 255, 0.5)",
            textShadow: "0 0 15px rgba(255, 255, 255, 0.8)"
          }}
          whileTap={{ y: 1 }}
          transition={{ duration: 0.2 }}
        >
          Join Free
        </JoinButton>
      </SignupContainer>
    </HeroSection>
  );
} 