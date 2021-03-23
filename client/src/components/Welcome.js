import React from 'react';
import styled from 'styled-components';
import WelcomeImage from '../images/welcome_image.jpg';
import WelcomeMask from '../images/blob.svg';
import size from '../responsiveStyles';

const Welcome = () => {
  return (
    <WelcomeSection>
      <ImageMask src={WelcomeImage} />
      <WelcomeText>
        <HeadingText>Welcome</HeadingText>
        <SubtitleText>About Yum</SubtitleText>
        <ContentText>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt,
          doloremque explicabo iure nemo beatae, neque deserunt fuga assumenda
          enim qui libero vero quaerat aut iste maxime porro! Autem, possimus
          magni.
        </ContentText>
        <ContentText>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
          vitae rem obcaecati alias quibusdam quisquam omnis minus harum. Non
          earum ut in?
        </ContentText>
        <Button href="#">Click Me</Button>
      </WelcomeText>
    </WelcomeSection>
  );
};

const ImageMask = styled.img`
  mask-image: url(${WelcomeMask});
  mask-repeat: no-repeat;
  mask-size: cover;
  height: 50rem;
  mask-position: 0px -55px;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    height: 30rem;
    mask-position: 0px -30px;
  }
  @media (${size.md}) {
    width: 100%;
    height: unset;
    mask: 0;
  }
  @media (${size.sm}) {
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
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    margin-bottom: 200px;

    flex-direction: column;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;
const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 45vh;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    height: unset;
    width: 100%;
    padding: 0 5vw;
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
  width: 55ch;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    margin: 0;
    margin-bottom: 3rem;
    font-size: 1.8rem;
    width: 100%;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const Button = styled.a`
  margin: 0;
  text-decoration: none;
  font-size: 2rem;
  padding: 1.5rem 3rem;
  background: var(--highlight-color);
  border-radius: 4px;
  color: var(--bg-color);
  align-self: flex-start;
  transition: background 0.2s;
  &:hover {
    background: var(--button-hover-color);
  }

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    font-size: 1.8rem;
    padding: 1.5rem 2.5rem;
  }
  @media (${size.sm}) {
    padding: 1rem 2rem;
  }
  @media (${size.xs}) {
  }
`;

export default Welcome;
