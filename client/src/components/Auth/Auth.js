import React, { useState } from 'react';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Nav from '../Nav';

const Auth = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {};

  const handleChange = () => {};

  const switchMode = (e) => {
    setIsSignedUp((prev) => !prev);
    setShowPassword(false);
  };

  return (
    <PageContainer>
      <Nav />

      <Card>
        <UserImage>
          <FontAwesomeIcon icon={faLock} />
        </UserImage>
        <Title>{isSignedUp ? 'Sign In' : 'Sign Up'}</Title>
        <Form onSubmit={handleSubmit}>
          {!isSignedUp && (
            <>
              <InputRow>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  onChange={() => handleChange()}
                  autoFocus
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  onChange={() => handleChange()}
                />
              </InputRow>
            </>
          )}
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={() => handleChange()}
          />
          <PasswordRow>
            <Input
              name="password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </PasswordRow>
          {!isSignedUp && (
            <Input
              name="repeatPassword"
              placeholder="Repeat Password"
              onChange={() => handleChange()}
            />
          )}
          <Button type="submit">{isSignedUp ? 'Sign In' : 'Sign Up'}</Button>
        </Form>
        <ModeButton onClick={() => switchMode()}>
          {isSignedUp
            ? 'Already have an account? Sign In'
            : `Don't have an account? Sign Up`}
        </ModeButton>
      </Card>
    </PageContainer>
  );
};

const Card = styled.div`
  background: var(--highlight-color);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 50rem;

  padding: 2rem;
  color: var(--bg-color);
  font-family: var(--header-font);
  font-size: 3.6rem;
  border-radius: 6px;
  margin-top: 10rem;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  padding: 0 15vw;
  overflow-x: hidden;
`;

const UserImage = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  overflow: hidden;
  position: relative;
  font-size: 1.25rem;
  align-items: center;
  flex-shrink: 0;
  font-family: var(--heading-font);
  line-height: 1;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  background: var(--bg-color);

  svg {
    color: var(--highlight-color);
    height: 2rem;
  }
`;

const Title = styled.span`
  font-weight: 600;
  font-family: var(--heading-font);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  outline: none;
  border: 0;
  height: 5rem;
  width: 100%;
  font-size: 1.8rem;
  border-radius: 8px;
  color: var(--text-color);
  font-family: var(--text-font);
  padding-left: 1rem;
  margin-top: 2rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
  width: 100%;
`;

const PasswordRow = styled.div`
  display: flex;
  align-items: center;

  margin-top: 2rem;
  width: 100%;
  background: var(--bg-color);
  border-radius: 8px;
  input {
    margin-top: 0;
  }
  svg {
    color: var(--highlight-color);
    height: 2rem;
    margin: 0rem 1rem 0rem 1rem;
    cursor: pointer;
    user-select: none;
  }
`;

const Button = styled.button`
  margin-top: 2rem;
  height: 100%;
  width: 12rem;
  background: var(--highlight-color);
  color: white;
  border: 0;
  font-family: var(--header-font);
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  outline: 0;
`;

const ModeButton = styled(Button)`
  align-self: flex-end;
  width: fit-content;
`;

export default Auth;
