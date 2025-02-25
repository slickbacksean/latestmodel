"use client";

import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 2rem;
  color: #fff;
  max-width: 800px;
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

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #fff;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #6b73ff;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #6b73ff;
  }
`;

const SubmitButton = styled.button`
  background: #6b73ff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #8388ff;
  }
`;

export default function ContactPage() {
  return (
    <PageContainer>
      <Title>Contact Us</Title>
      <Content>
        <p>
          Have questions or need support? We're here to help. Fill out the form
          below and we'll get back to you as soon as possible.
        </p>
      </Content>
      <ContactForm onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label>Name</Label>
          <Input type="text" placeholder="Your name" />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" placeholder="your@email.com" />
        </FormGroup>
        <FormGroup>
          <Label>Message</Label>
          <TextArea placeholder="How can we help you?" />
        </FormGroup>
        <SubmitButton type="submit">Send Message</SubmitButton>
      </ContactForm>
    </PageContainer>
  );
} 