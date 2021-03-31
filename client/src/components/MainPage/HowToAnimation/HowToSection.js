import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import OpenCardAnimation from './OpenCardAnimation';
import DragAndDropAnimation from './DragAndDropAnimation';
import size from '../../../styles/responsiveStyles';
import { Link } from 'react-router-dom';

const HowToSection = () => {
  const isMobile = useSelector((state) => state.isMobile);

  return (
    <Section name="HowTo">
      <TextContainer>
        <HeadingText>Our Services</HeadingText>
        <SubtitleText>How It Works</SubtitleText>
        <ContentText>
          Click on a recipe card to view the full recipe instructions,
          ingredients, and nutrition information.{' '}
          <Link to="/auth">Login or create an account</Link> to save and access
          your recipes.
          {!isMobile
            ? ' Drag the card to recipe sidebar on the right to add it to your recipe list.'
            : ' Click the plus symbol to add the recipe to your recipe list.'}
        </ContentText>
      </TextContainer>
      {!isMobile ? <DragAndDropAnimation /> : <OpenCardAnimation />}
    </Section>
  );
};

const Section = styled.section`
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
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  padding: 0 5rem 0 0rem;
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
    margin-bottom: 3rem;
    font-size: 1.8rem;
    max-width: 100%;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

export default HowToSection;
