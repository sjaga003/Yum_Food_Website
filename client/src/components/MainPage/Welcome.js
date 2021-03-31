import React from 'react';
import styled from 'styled-components';
import WelcomeImage from '../../images/welcome_image.jpg';
import WelcomeMask from '../../images/blob.svg';
import size from '../../styles/responsiveStyles';

const Welcome = () => {
  return (
    <WelcomeSection data-testid="welcome-container">
      <ImageContainer>
        <ImageMask
          data-testid="welcome-image"
          src={WelcomeImage}
          alt="Welcome Image"
        />
      </ImageContainer>
      <WelcomeText>
        <HeadingText>Welcome</HeadingText>
        <SubtitleText>About Yum</SubtitleText>
        <ContentText>
          Yum pulls recipe data from the{' '}
          <a data-testid="welcome-link" href="https://spoonacular.com">
            Spoonacular API
          </a>{' '}
          and provides users with easy to read, simple recipes. Choose from a
          wide variety of recipes from a broad range of cultures and traditions.
        </ContentText>
        <ContentText>
          Looking to eat healthy? Yum provides you with accurate nutrition data
          and serving sizes. It also displays dietary restrictions so you know
          which recipes to avoid!
        </ContentText>
      </WelcomeText>
    </WelcomeSection>
  );
};

const ImageMask = styled.img`
  mask-image: url(${WelcomeMask});
  mask-repeat: no-repeat;
  mask-size: contain;
  width: 80%;
  mask-position: center;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    width: 100%;
    height: unset;
    mask: 0;
    border-radius: 8px;
  }
  @media (${size.sm}) {
    border-radius: 0;
  }
  @media (${size.xs}) {
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    width: 75%;
    padding: 5rem;
  }
  @media (${size.sm}) {
    width: 100%;
    padding: 0;
  }
  @media (${size.xs}) {
  }
`;

const WelcomeSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 300px;
  width: 100%;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    padding: 0 5vw;
  }
  @media (${size.md}) {
    margin-bottom: 200px;
    padding: 0;
    flex-direction: column;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    margin-bottom: 100px;
  }
`;
const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  padding: 0 5vw;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    height: unset;
    width: 100%;
    margin-top: 2rem;
  }
  @media (${size.sm}) {
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
  max-width: 55ch;
  margin-bottom: 1rem;

  a {
    color: var(--highlight-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    margin: 0;

    font-size: 1.8rem;
    max-width: 100%;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

export default Welcome;
