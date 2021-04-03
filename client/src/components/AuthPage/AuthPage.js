import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  faEye,
  faEyeSlash,
  faLock,
  faSyncAlt,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';
import {
  authSignIn,
  authSignUp,
  getAuthData,
  logoutUser,
} from '../../actions/authAction';
import size from '../../styles/responsiveStyles';
import Nav from '../Nav';

const initialFormData = {
  firstName: '',
  firstNameIsFocused: false,
  lastName: '',
  lastNameIsFocused: false,
  email: '',
  emailIsFocused: false,
  password: '',
  passwordNameIsFocused: false,
  repeatPassword: '',
  repeatPasswordIsFocused: false,
};

const Auth = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [passwordMatch, setPasswordMatch] = useState(false);

  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const [accessingDatabase, setAccessingDatabase] = useState(false);

  const user = useSelector((state) => state.auth.authData);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignedUp) {
      dispatch(
        authSignIn(
          formData,
          history,
          setIncorrectCredentials,
          setAccessingDatabase
        )
      );

      if (!incorrectCredentials) {
        setFormData(initialFormData);
      }
    } else {
      dispatch(authSignUp(formData, history));
    }
  };

  const guestLogIn = (e) => {
    dispatch(
      authSignIn(
        { email: 'guest@yum.com', password: 'guest' },
        history,
        setIncorrectCredentials,
        setAccessingDatabase
      )
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOnFocus = (e) => {
    const focusName = `${e.target.name}IsFocused`;
    setFormData({ ...formData, [focusName]: true });
  };
  const handleOnBlur = (e) => {
    const focusName = `${e.target.name}IsFocused`;
    setFormData({ ...formData, [focusName]: false });
  };

  const switchMode = (e) => {
    setIsSignedUp((prev) => !prev);
    setShowPassword(false);
    setIncorrectCredentials(false);
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

  const logout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  useEffect(() => {
    if (formData.password === formData.repeatPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [formData.password, formData.repeatPassword]);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.scrollTo(0, 0);
    }
  }, []);

  const variant = {
    active: {
      top: '-10px',
      left: '0px',
      fontSize: '1.4rem',
      transition: { type: 'tween', duration: 0.2 },
    },
    initial: {
      top: '21px',
      left: '1rem',
      fontSize: '1.8rem',
      transition: { type: 'tween', duration: 0.2 },
    },
  };

  return (
    <PageContainer data-testid="auth-container">
      <Nav />
      <Card>
        <UserImage>
          <FontAwesomeIcon icon={!user ? faLock : faUnlock} />
        </UserImage>
        {!user ? (
          <>
            <Title>{isSignedUp ? 'Sign In' : 'Sign Up'}</Title>
            <Form onSubmit={handleSubmit}>
              {accessingDatabase && (
                <Spinner>
                  <FontAwesomeIcon size="2x" icon={faSyncAlt} spin />
                </Spinner>
              )}

              {!isSignedUp && (
                <>
                  <InputRow>
                    <InputContainer accessingDatabase={accessingDatabase}>
                      <Input
                        required
                        name="firstName"
                        id="firstName"
                        onChange={handleChange}
                        onFocus={handleOnFocus}
                        onBlur={handleOnBlur}
                        value={'' || formData.firstName}
                      />
                      <InputLabel
                        htmlFor="firstName"
                        variants={variant}
                        initial={'initial'}
                        animate={
                          formData.firstName !== '' ||
                          formData.firstNameIsFocused
                            ? 'active'
                            : 'initial'
                        }
                      >
                        First Name
                      </InputLabel>
                    </InputContainer>
                    <InputContainer accessingDatabase={accessingDatabase}>
                      <Input
                        id="lastName"
                        required
                        name="lastName"
                        onChange={handleChange}
                        onFocus={handleOnFocus}
                        onBlur={handleOnBlur}
                        value={'' || formData.lastName}
                      />
                      <InputLabel
                        htmlFor="lastName"
                        variants={variant}
                        initial={'initial'}
                        animate={
                          formData.lastName !== '' || formData.lastNameIsFocused
                            ? 'active'
                            : 'initial'
                        }
                      >
                        Last Name
                      </InputLabel>
                    </InputContainer>
                  </InputRow>
                </>
              )}
              <InputContainer
                accessingDatabase={accessingDatabase}
                incorrectCredentials={incorrectCredentials}
              >
                <Input
                  id="email"
                  incorrectCredentials={incorrectCredentials}
                  required
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  value={'' || formData.email}
                />
                <InputLabel
                  htmlFor="email"
                  incorrectCredentials={incorrectCredentials}
                  variants={variant}
                  initial={'initial'}
                  animate={
                    formData.email !== '' || formData.emailIsFocused
                      ? 'active'
                      : 'initial'
                  }
                >
                  Email
                </InputLabel>
              </InputContainer>
              <InputContainer
                accessingDatabase={accessingDatabase}
                incorrectCredentials={incorrectCredentials}
              >
                <InputLabel
                  htmlFor="password"
                  incorrectCredentials={incorrectCredentials}
                  variants={variant}
                  initial={'initial'}
                  animate={
                    formData.password !== '' || formData.passwordIsFocused
                      ? 'active'
                      : 'initial'
                  }
                >
                  Password
                </InputLabel>
                <Input
                  id="password"
                  incorrectCredentials={incorrectCredentials}
                  required
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  value={'' || formData.password}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputContainer>
              {!isSignedUp && (
                <InputContainer accessingDatabase={accessingDatabase}>
                  <Input
                    id="repeat_password"
                    required
                    type="password"
                    name="repeatPassword"
                    onChange={handleChange}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    value={'' || formData.repeatPassword}
                  />
                  <InputLabel
                    htmlFor="repeat_password"
                    variants={variant}
                    initial={'initial'}
                    animate={
                      formData.repeatPassword !== '' ||
                      formData.repeatPasswordIsFocused
                        ? 'active'
                        : 'initial'
                    }
                  >
                    Repeat Password
                  </InputLabel>
                </InputContainer>
              )}
              {isSignedUp && incorrectCredentials && (
                <IncorrectError>Incorrect Username or Password</IncorrectError>
              )}
              <Button
                type="submit"
                disabled={!isSignedUp ? !passwordMatch : false}
              >
                {isSignedUp ? 'Sign In' : 'Sign Up'}
              </Button>
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

            <ModeButton onClick={(e) => guestLogIn(e)}>
              Sign In as a Guest
            </ModeButton>

            <ModeButton onClick={() => switchMode()}>
              {isSignedUp
                ? `Don't have an account? Sign Up `
                : `Already have an account? Sign In`}
            </ModeButton>
          </>
        ) : (
          <Title>Currently Signed In</Title>
        )}
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
  margin: 15rem 0;
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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  padding: 0vh 15vw 1vh 15vw;
  overflow-x: hidden;
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

const Form = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Spinner = styled.div`
  color: var(--secondary-color);
  display: flex;
  align-self: center;
  position: absolute;
  top: 20%;
`;

const Input = styled.input`
  flex: 1;
  outline: none;
  border: 0;
  height: 5rem;
  width: 100%;
  font-size: 1.8rem;
  border-radius: 8px;
  color: var(--text-color);
  font-family: var(--text-font);
  border: 1px solid lightgray;
  padding-left: 1rem;

  ${({ incorrectCredentials }) =>
    incorrectCredentials &&
    css`
      border: 1px #cc0000 solid;
      color: #cc0000;
    `}
`;

const InputRow = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    gap: 0rem;
    flex-wrap: wrap;
  }
  @media (${size.xs}) {
  }
`;

const InputContainer = styled.div`
  position: relative;
  /* margin-top: 2rem; */
  align-items: stretch;
  width: 100%;
  margin-top: 1.5rem;
  ${({ accessingDatabase }) =>
    accessingDatabase &&
    css`
      visibility: hidden;
    `}

  & svg {
    position: absolute;
    color: var(--highlight-color);
    height: 2rem;
    margin: 0rem 1rem 0rem 1rem;
    top: 25px;
    right: 0;
    cursor: pointer;
    user-select: none;
    transition: color 0.2s;
    &:hover {
      color: var(--button-hover-color);
    }
    ${({ incorrectCredentials }) =>
      incorrectCredentials &&
      css`
        color: #cc0000;
        &:hover {
          color: #a3141e;
        }
      `}
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
  &:disabled {
    color: rgba(0, 0, 0, 0.26);
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.12);
    cursor: default;
  }
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    font-size: 1.4rem;
  }
  @media (${size.xs}) {
  }
`;

const InputLabel = styled(motion.label)`
  position: absolute;
  left: 1rem;
  pointer-events: none;
  z-index: 1;
  top: 21px;
  left: 1rem;
  color: var(--text-color);
  font-family: var(--text-font);
  font-size: 1.8rem;
  ${({ incorrectCredentials }) =>
    incorrectCredentials &&
    css`
      color: #cc0000;
    `}
`;

const ModeButton = styled(Button)`
  align-self: flex-end;
  width: fit-content;
  background: none;
  color: var(--text-color);
  transition: none;
  & + & {
    margin-top: 0rem;
  }

  &:hover {
    background: none;
  }
`;

const IncorrectError = styled.span`
  color: #cc0000;
  font-size: 1.8rem;
  font-family: var(--text-font);
  display: flex;
  align-self: flex-start;
  margin-top: 2rem;
`;

export default Auth;
