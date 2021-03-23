import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { clearRecipeCards } from '../actions/recipeCardsAction';
import HeaderMask from '../images/header_mask.svg';
import SushiImage from '../images/sushi.jpg';
import size from '../responsiveStyles';

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearRecipeCards());
  }, [location.pathname, dispatch]);

  return (
    <HomeContainer>
      <HomeContent>
        <Hero>Recipes At Your Fingertips</Hero>
        <HeroDescription>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          eaque architecto voluptatem eius quasi veritatis. Dolor eius dolores
          provident totam.
        </HeroDescription>
        <div>
          <LearnMoreButton href="#">Learn More</LearnMoreButton>
        </div>
      </HomeContent>
      <ImageContainer>
        <HeaderImg draggable={false} src={SushiImage} alt="Header" />
      </ImageContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 75vh;
  max-width: 120rem;
  align-self: center;
  margin-bottom: 500px;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    height: 80vh;
    margin-bottom: 200px;
    padding: 0vh 5vw;
    justify-content: center;
  }
  @media (${size.md}) {
    padding: 10vh 15vw;
  }
  @media (${size.sm}) {
    padding: 15vh 5vw;
    align-items: flex-start;
  }
  @media (${size.xs}) {
  }
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Hero = styled.h1`
  font-family: var(--header-font);
  color: var(--header-color);
  font-size: 7.2rem;
  font-weight: 600;
  line-height: 1.3;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    font-size: 4.8rem;
    margin-bottom: 2rem;
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    font-size: 3.6rem;
  }
  @media (${size.xs}) {
  }
`;

const HeroDescription = styled.p`
  font-family: var(--text-font);
  color: var(--secondary-color);
  font-size: 2rem;
  width: 75%;
  margin: 3rem 0 5rem 0;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    margin: 0;
    margin-bottom: 3rem;
  }
  @media (${size.sm}) {
    width: 100%;
    font-size: 1.8rem;
  }
  @media (${size.xs}) {
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    display: none;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const HeaderImg = styled.img`
  mask-image: url(${HeaderMask});
  mask-repeat: no-repeat;
  mask-size: contain;
  width: 50rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    width: 40rem;
  }
  @media (${size.md}) {
    display: none;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const LearnMoreButton = styled.a`
  margin: 0;
  text-decoration: none;
  font-size: 2rem;
  padding: 2rem 3rem;
  background: var(--highlight-color);
  border-radius: 4px;
  color: var(--bg-color);
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

export default Home;
