import styled from 'styled-components';
import Link from 'next/link';

const FooterSection = styled.footer`
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 4rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
`;

const FooterLink = styled(Link)`
  color: #999;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #6b73ff;
  }
`;

const FooterText = styled.p`
  color: #999;
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: #999;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #6b73ff;
  }
`;

const BottomBar = styled.div`
  max-width: 1400px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export default function Footer() {
  return (
    <FooterSection>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>AI Directory</FooterTitle>
          <FooterText>
            Stay up to date with the latest in AI technology and learn how to apply it in your work.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://twitter.com" target="_blank">Twitter</SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank">LinkedIn</SocialLink>
            <SocialLink href="https://github.com" target="_blank">GitHub</SocialLink>
          </SocialLinks>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink href="/models">Models</FooterLink>
          <FooterLink href="/tools">Tools</FooterLink>
          <FooterLink href="/tutorials">Tutorials</FooterLink>
          <FooterLink href="/community">Community</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Company</FooterTitle>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="/careers">Careers</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
          <FooterLink href="/cookies">Cookie Policy</FooterLink>
        </FooterColumn>
      </FooterContent>

      <BottomBar>
        <div>© 2024 AI Directory. All rights reserved.</div>
        <div>Made with ❤️ for the AI community</div>
      </BottomBar>
    </FooterSection>
  );
} 