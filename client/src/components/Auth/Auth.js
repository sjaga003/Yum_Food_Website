import React, { useState } from 'react';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Nav from '../Nav';
import { GoogleLogin } from 'react-google-login';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';
import { authSignIn, authSignUp, getAuthData } from '../../actions/authAction';
import { useHistory } from 'react-router';
import { fetchToCookBook } from '../../actions/cookBookAction';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const Auth = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignedUp) {
      dispatch(authSignIn(formData, history));
    } else {
      dispatch(authSignUp(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = (e) => {
    setIsSignedUp((prev) => !prev);
    setShowPassword(false);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(getAuthData(result, token));
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const googleFailure = () => {
    console.error('Google Sign In was unsuccessful');
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
                  onChange={handleChange}
                  autoFocus
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </InputRow>
            </>
          )}
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <PasswordRow>
            <Input
              name="password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          )}
          <Button type="submit">{isSignedUp ? 'Sign In' : 'Sign Up'}</Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FontAwesomeIcon icon={faGoogle} /> Sign In With Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </Form>
        <ModeButton onClick={() => switchMode()}>
          {isSignedUp
            ? `Don't have an account? Sign Up `
            : `Already have an account? Sign In`}
        </ModeButton>
      </Card>
    </PageContainer>
  );
};

const Card = styled.div`
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
  margin-top: 10rem;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  padding: 0vh 15vw 1vh 15vw;
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
  font-family: var(--header-font);
  line-height: 1;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  background: var(--highlight-color);

  svg {
    color: var(--bg-color);
    height: 2rem;
  }
`;

const Title = styled.span`
  font-weight: 600;
  font-family: var(--header-font);
  color: var(--header-color);
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
  margin-top: 2rem;
  border: 1px solid lightgray;
  padding-left: 1rem;
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
  border: 1px solid lightgray;
  input {
    margin-top: 0;

    border: 0;
  }
  svg {
    color: var(--highlight-color);
    height: 2rem;
    margin: 0rem 1rem 0rem 1rem;
    cursor: pointer;
    user-select: none;
    transition: color 0.2s;
    &:hover {
      color: var(--button-hover-color);
    }
  }
`;

const Button = styled.button`
  border: 0;
  padding: 1rem 2rem;
  font-family: var(--text-font);
  font-size: 1.8rem;
  cursor: pointer;
  outline: none;
  background: var(--highlight-color);
  color: white;
  border-radius: 4px;
  margin-top: 2rem;
  width: 100%;
  transition: background 0.2s;
  &:hover {
    background: var(--button-hover-color);
  }
`;

const ModeButton = styled(Button)`
  align-self: flex-end;
  width: fit-content;
  background: none;
  color: var(--text-color);
  transition: none;
  &:hover {
    background: none;
  }
`;

export default Auth;
