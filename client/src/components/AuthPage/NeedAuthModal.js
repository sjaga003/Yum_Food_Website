import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import CardSave from '../../images/card_save.svg';
import size from '../../styles/responsiveStyles';

const NeedAuthModal = ({ cantClose, setNeedAuthOpen }) => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.authData);
  useEffect(() => {
    if (user) {
      document.body.style.overflowY = 'auto';
    } else {
      document.body.style.overflowY = 'hidden';
    }
  }, [user]);

  return (
    <CardShadow
      className="shadow"
      onClick={(e) => {
        if (e.target.classList.contains('shadow')) {
          document.body.style.overflowY = 'auto';
          setNeedAuthOpen(false);
          if (cantClose) {
            history.push('/');
          }
        }
      }}
    >
      <Card data-testid="need-auth-container">
        <CardSection>
          <div>
            <HeadingText>Want More?</HeadingText>
            <SubtitleText>Sign In</SubtitleText>
          </div>
          <ContentText>
            Create an account or sign in to Yum. Search and organize recipes,
            then save them to your personal recipe list!
          </ContentText>

          <Link
            onClick={() => (document.body.style.overflowY = 'auto')}
            to="/auth"
            data-testid="need-auth-button"
          >
            <Button>Sign Up or Sign In </Button>
          </Link>
        </CardSection>
        <CloseButton
          onClick={() => {
            document.body.style.overflowY = 'auto';
            setNeedAuthOpen(false);
            if (cantClose) {
              history.push('/');
            }
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <CardSection>
          <img data-testid="need-auth-image" src={CardSave} alt="Card Save" />
        </CardSection>
      </Card>
    </CardShadow>
  );
};

const Card = styled.div`
  background: var(--card-color);
  display: flex;
  justify-content: space-evenly;
  width: 100rem;
  min-height: 50rem;
  align-items: center;
  padding: 2rem;
  color: var(--header-color);
  font-family: var(--header-font);
  font-size: 3.6rem;
  border-radius: 6px;
  position: relative;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  user-select: none;
  & > div:first-child {
    border-right: 2px solid #c2c5c9;
  }
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    width: 90vw;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    & > div:first-child {
      border-right: 0;
    }
  }
`;

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardSection = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  img {
    width: 100%;
  }
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    width: 100%;
    &:last-child {
      display: none;
    }
  }
`;

const HeadingText = styled.div`
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

const ContentText = styled.span`
  font-family: var(--text-font);
  font-size: 1.8rem;
  color: var(--text-color);
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    margin: 0;
    font-size: 1.6rem;
    width: 100%;
  }
  @media (${size.sm}) {
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
  background: var(--highlight-color);
  color: white;
  border-radius: 4px;
  margin-top: 2rem;
  width: 100%;
  transition: background 0.2s;
  &:hover {
    background: var(--button-hover-color);
  }
  a {
    text-decoration: none;
    color: var(--bg-color);
  }
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    font-size: 1.6rem;
    padding: 1.5rem 2.5rem;
  }
  @media (${size.sm}) {
    padding: 1rem 2rem;
  }
  @media (${size.xs}) {
  }
`;

const CloseButton = styled.span`
  position: absolute;
  height: 3rem;
  width: 3rem;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    height: 3rem;
    width: 3rem;
    color: var(--text-color);
  }
`;

export default NeedAuthModal;
