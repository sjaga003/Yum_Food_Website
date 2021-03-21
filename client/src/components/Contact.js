import { motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';

const Contact = () => {
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleOnChange = (e) => {
    setContactFormData({ ...contactFormData, [e.target.name]: e.target.value });
  };

  return (
    <ContactSection>
      <ContactBox>
        <HeadingText>Have Questions?</HeadingText>
        <SubtitleText>Contact Us</SubtitleText>
        <Form autoComplete="off">
          <InputContainer>
            <ValueInput required onChange={handleOnChange} name="name" />
            <InputLabel
              animate={
                contactFormData.name != ''
                  ? { top: '-24px', left: '0px' }
                  : { top: 'initial' }
              }
            >
              Name
            </InputLabel>
          </InputContainer>
          <InputContainer>
            <ValueInput
              required
              name="email"
              type="email"
              onChange={handleOnChange}
            />
            <InputLabel
              animate={
                contactFormData.email != ''
                  ? { top: '-24px', left: '0px' }
                  : { top: 'initial' }
              }
            >
              Email
            </InputLabel>
          </InputContainer>
          <InputContainer>
            <MessageInput required name="message" onChange={handleOnChange} />
            <InputLabel
              className="textarea-label"
              animate={
                contactFormData.message != ''
                  ? { top: '-32px', left: '0px' }
                  : { top: 'initial' }
              }
            >
              Message
            </InputLabel>
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

const HeadingText = styled.span`
  font-family: var(--header-font);
  font-variant: small-caps;
  font-weight: 600;
  font-size: 2.8rem;
  color: var(--highlight-color);
`;

const SubtitleText = styled.span`
  font-family: var(--header-font);
  font-size: 3.6rem;
  color: var(--header-color);
  font-weight: 600;
  margin-bottom: 1.8rem;
`;

const InputLabel = styled(motion.label)`
  position: absolute;
  left: 1rem;
  pointer-events: none;

  z-index: 1;
  color: var(--text-color);
  font-family: var(--text-font);
  font-size: 1.8rem;
`;

const InputContainer = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-bottom: 3rem;
  position: relative;
  border: 1px solid lightgray;
  .textarea-label {
    display: flex;
    align-self: flex-start;
    padding-top: 0.8rem;
  }
`;

const ValueInput = styled.input`
  outline: none;
  border: 0;
  height: 6rem;
  width: 40rem;
  font-size: 1.8rem;
  border-radius: 8px;
  color: var(--text-color);
  font-family: var(--text-font);
  padding-left: 1rem;
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
  padding-left: 1rem;
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
