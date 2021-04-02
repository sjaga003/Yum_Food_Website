import { motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import size from '../../styles/responsiveStyles';

const Contact = ({ mockHandleSubmit }) => {
  const initialContactFormData = {
    name: '',
    nameIsFocused: false,
    email: '',
    emailIsFocused: false,
    message: '',
    messageIsFocused: false,
  };

  const [contactFormData, setContactFormData] = useState(
    initialContactFormData
  );

  const handleOnChange = (e) => {
    setContactFormData({ ...contactFormData, [e.target.name]: e.target.value });
  };
  const handleOnFocus = (e) => {
    const focusName = `${e.target.name}IsFocused`;
    setContactFormData({ ...contactFormData, [focusName]: true });
  };
  const handleOnBlur = (e) => {
    const focusName = `${e.target.name}IsFocused`;
    setContactFormData({ ...contactFormData, [focusName]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      mockHandleSubmit();
    } catch (error) {}

    setContactFormData(initialContactFormData);
  };

  const variant = {
    active: {
      top: '-20px',
      left: '0px',
      fontSize: '1.4rem',
      transition: { type: 'tween', duration: 0.2 },
    },
    initial: {
      top: '1.6rem',
      left: '1rem',
      fontSize: '1.8rem',
      transition: { type: 'tween', duration: 0.2 },
    },
  };

  return (
    <ContactSection data-testid="contact-container">
      <ContactBox>
        <HeadingText>Have Questions?</HeadingText>
        <SubtitleText>Contact Us</SubtitleText>
        <Form
          data-testid="contact-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <InputContainer>
            <ValueInput
              data-testid="contact-name"
              required
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              value={'' || contactFormData.name}
              name="name"
              label="Name"
              id="name"
            />
            <InputLabel
              htmlFor="name"
              variants={variant}
              initial={'initial'}
              animate={
                contactFormData.name !== '' || contactFormData.nameIsFocused
                  ? 'active'
                  : 'initial'
              }
            >
              Name
            </InputLabel>
          </InputContainer>
          <InputContainer>
            <ValueInput
              data-testid="contact-email"
              required
              name="email"
              label="Email"
              type="email"
              id="email"
              value={'' || contactFormData.email}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />
            <InputLabel
              htmlFor="email"
              variants={variant}
              initial={'initial'}
              animate={
                contactFormData.email !== '' || contactFormData.emailIsFocused
                  ? 'active'
                  : 'initial'
              }
            >
              Email
            </InputLabel>
          </InputContainer>
          <InputContainer>
            <MessageInput
              data-testid="contact-message"
              required
              name="message"
              label="Message"
              id="message"
              value={'' || contactFormData.message}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />
            <InputLabel
              htmlFor="message"
              variants={variant}
              initial={'initial'}
              className="textarea-label"
              animate={
                contactFormData.message !== '' ||
                contactFormData.messageIsFocused
                  ? {
                      top: '-3rem',
                      left: '0px',
                      fontSize: '1.4rem',
                      transition: { type: 'tween', duration: 0.2 },
                    }
                  : {
                      top: '0.5rem',
                      left: '1rem',
                      fontSize: '1.8rem',
                      transition: { type: 'tween', duration: 0.2 },
                    }
              }
            >
              Message
            </InputLabel>
          </InputContainer>
          <Button
            type="submit"
            data-testid="contact-submit"
            aria-label="Submit"
          >
            Submit {'➞'}
          </Button>
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
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    padding: 0 5vw;
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
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

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    width: 100%;
  }
  @media (${size.xs}) {
  }
`;

const HeadingText = styled.span`
  font-family: var(--header-font);
  font-variant: small-caps;
  font-weight: 600;
  font-size: 2.8rem;
  color: var(--highlight-color);
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    font-size: 2.4rem;
  }
  @media (${size.xs}) {
  }
`;

const SubtitleText = styled.span`
  font-family: var(--header-font);
  font-size: 3.6rem;
  color: var(--header-color);
  font-weight: 600;
  margin-bottom: 1.8rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    font-size: 2.8rem;
  }
  @media (${size.xs}) {
  }
`;

const InputLabel = styled(motion.label)`
  position: absolute;
  left: 1rem;
  top: 1.6rem;
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
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    width: 100%;
  }
  @media (${size.xs}) {
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
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    width: 100%;
  }
  @media (${size.xs}) {
  }
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
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
  @media (${size.xs}) {
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    width: 100%;
  }
  @media (${size.xs}) {
  }
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
