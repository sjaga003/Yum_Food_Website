import React from 'react';
import styled from 'styled-components';

const Contact = () => {
  return (
    <ContactSection>
      <ContactBox>
        <ContactHeader>Contact Us</ContactHeader>
        <Form>
          <EmailInput placeholder="Enter your email" />
          <Button>Submit</Button>
        </Form>
      </ContactBox>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ContactBox = styled.div`
  background: var(--highlight-color);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 80rem;
  height: 30rem;
  padding: 2rem;
  color: white;
  font-family: var(--header-font);
  font-size: 3.6rem;
  border-radius: 6px;
`;

const ContactHeader = styled.span`
  font-weight: 600;
`;

const EmailInput = styled.input`
  outline: none;
  border: 0;
  height: 6rem;
  width: 40rem;
  font-size: 1.8rem;
  border-radius: 8px;
  color: var(--secondary-color);
  font-family: var(--text-font);
`;

const Form = styled.form`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 3rem;
  border-radius: 6px;
`;

const Button = styled.button`
  height: 100%;
  width: 12rem;
  background: var(--highlight-color);
  color: white;
  border: 0;
  font-family: var(--text-font);
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
`;

export default Contact;
