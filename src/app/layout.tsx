"use client";

import { Inter } from 'next/font/google';
import styled from 'styled-components';
import Navigation from './components/NavBar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

const MainLayout = styled.div`
  min-height: 100vh;
  background-color: #000;
  background-image: radial-gradient(rgba(255, 255, 255, 0.15) 0.5px, transparent 0.5px);
  background-size: 15px 15px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 80px; // Add padding for the fixed navbar
  flex: 1;
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>
          <Navigation />
          <Content>
            {children}
          </Content>
          <Footer />
        </MainLayout>
      </body>
    </html>
  );
}
