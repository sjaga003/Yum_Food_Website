import React from 'react';
import styled from 'styled-components';

const Contact = () => {
  return (
    <ContactSection>
      <ContactBox>
        <ContactHeader>Contact Us</ContactHeader>
        <Form>
          <InputContainer>
            <NameInput placeholder="Name" />
          </InputContainer>
          <InputContainer>
            <EmailInput type="email" placeholder="Email" />
          </InputContainer>
          <InputContainer>
            <MessageInput placeholder="Message" />
          </InputContainer>
          <Button>Submit {'➞'}</Button>
        </Form>
      </ContactBox>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 300px;
`;

const ContactBox = styled.div`
  background: var(--card-color);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 60rem;

  padding: 2rem;
  color: var(--bg-color);
  font-family: var(--header-font);
  font-size: 3.6rem;
  border-radius: 6px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
`;

const ContactHeader = styled.span`
  font-weight: 600;
  margin-bottom: 5rem;
  color: var(--header-color);
  font-family: var(--header-font);
  font-size: 3.6rem;
`;

const InputContainer = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 3rem;
  border-radius: 6px;
  margin-bottom: 1.8rem;
  border: 1px solid lightgray;
`;

const EmailInput = styled.input`
  outline: none;
  border: 0;
  height: 6rem;
  width: 40rem;
  font-size: 1.8rem;
  border-radius: 8px;
  color: var(--text-color);
  font-family: var(--text-font);
`;

const NameInput = styled.input`
  outline: none;
  border: 0;
  height: 6rem;
  width: 40rem;
  font-size: 1.8rem;
  border-radius: 8px;
  color: var(--text-color);
  font-family: var(--text-font);
`;

const MessageInput = styled.textarea`
  outline: none;
  border: 0;
  height: 20rem;
  width: 40rem;
  max-width: 40rem;
  min-width: 40rem;
  min-height: 20rem;
  max-height: 40rem;
  font-size: 1.8rem;
  border-radius: 8px;
  color: var(--text-color);
  padding-top: 1rem;
  font-family: var(--text-font);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 3rem;
`;

const Button = styled.button`
  border: 0;
  padding: 1rem 2rem;
  font-family: var(--text-font);
  font-size: 1.8rem;
  cursor: pointer;
  outline: none;
  background: transparent;
  background: var(--highlight-color);
  color: white;
  border-radius: 4px;
  transition: background 0.2s;
  &:hover {
    background: var(--button-hover-color);
  }
`;

export default Contact;
