import React from 'react';
import styled from 'styled-components';
import WelcomeImage from '../images/welcome_image.jpg';
import WelcomeMask from '../images/blob.svg';

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
`;

const WelcomeSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 400px 0;
`;
const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 45vh;
`;

const HeadingText = styled.span`
  font-family: 'Prompt', sans-serif;
  font-size: 2.4rem;
  color: var(--highlight-color);
`;

const SubtitleText = styled.span`
  font-family: var(--text-font);
  font-size: 3.6rem;
  color: var(--text-color);
`;

const ContentText = styled.span`
  font-family: var(--text-font);
  font-size: 1.8rem;
  color: var(--text-color);
  width: 55ch;
`;

const Button = styled.a`
  margin: 0;
  text-decoration: none;
  font-size: 2rem;
  padding: 1rem 3rem;
  background: var(--highlight-color);
  border-radius: 4px;
  color: var(--bg-color);
  align-self: flex-start;
`;

export default Welcome;
