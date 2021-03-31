import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import { clearRecipeCards } from '../../actions/recipeCardsAction';
import HeaderMask from '../../images/header_mask.svg';
import SushiImage from '../../images/sushi.jpg';
import size from '../../styles/responsiveStyles';

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearRecipeCards());
  }, [location.pathname, dispatch]);

  return (
    <HomeContainer data-testid="home-container">
      <HomeContent>
        <Hero>Recipes At Your Fingertips</Hero>
        <HeroDescription>
          Browse thousands of recipes to find new inspiration for all your
          cooking creations. Running low on time? Save the recipes to your
          personal recipe book for later use!
        </HeroDescription>
        <div>
          <LearnMoreButton
            data-testid="home-button"
            spy={true}
            smooth={true}
            to="HowTo"
            offset={-50}
            aria-label="Learn More"
          >
            Learn More
          </LearnMoreButton>
        </div>
      </HomeContent>
      <ImageContainer>
        <HeaderImg
          data-testid="home-image"
          draggable={false}
          src={SushiImage}
          alt="Header"
        />
      </ImageContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 75vh;

  align-self: center;
  margin-bottom: 500px;
  margin-top: 8rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    height: 100vh;
    margin-bottom: 20rem;
    padding: 0vh 5vw;
    justify-content: center;
    height: 50vh;
  }
  @media (${size.md}) {
    background: rgb(227, 139, 0);
    background: linear-gradient(
      365deg,
      rgba(227, 139, 0, 0.29735644257703087) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    padding: 10vh 5vw;
    margin-bottom: 10rem;
    height: 100vh;
  }
  @media (${size.sm}) {
    padding: 15vh 5vw;
    margin-bottom: 0rem;
    align-items: flex-start;
  }
  @media (${size.xs}) {
  }
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    width: 100%;
    justify-content: flex-start;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
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
  width: 90%;
  max-width: 50ch;
  margin: 3rem 0 3rem 0;

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
  width: 50%;
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
  mask-position: center;
  width: 100%;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    /* width: 40rem; */
  }
  @media (${size.md}) {
    display: none;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const LearnMoreButton = styled(Link)`
  margin: 0;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  padding: 1.5rem 3rem;
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
