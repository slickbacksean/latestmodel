import styled from 'styled-components';
import Link from 'next/link';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: #6b73ff;
  }
`;

const LoginButton = styled(Link)`
  padding: 0.5rem 1.5rem;
  background: #6b73ff;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: #8388ff;
    transform: translateY(-2px);
  }
`;

export default function Navigation() {
  return (
    <NavBar>
      <NavContainer>
        <Link href="/" passHref>
          <Logo>Latest Models</Logo>
        </Link>
        <NavLinks>
          <StyledLink href="/models">Models</StyledLink>
          <StyledLink href="/tools">Tools</StyledLink>
          <StyledLink href="/tutorials">Tutorials</StyledLink>
          <StyledLink href="/community">Community</StyledLink>
          <StyledLink href="/subscription">Subscription</StyledLink>
          <LoginButton href="/login">Login</LoginButton>
        </NavLinks>
      </NavContainer>
    </NavBar>
  );
} 