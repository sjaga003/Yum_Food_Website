import React from 'react';
import styled from 'styled-components';
import SushiImage from '../images/sushi.jpg';
import HeaderMask from '../images/header_mask.svg';

const Home = () => {
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
  margin: 0 0 600px 0;
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Hero = styled.h1`
  font-family: var(--header-font);
  font-size: 7.2rem;
  font-weight: 600;
  line-height: 1.3;
`;

const HeroDescription = styled.p`
  font-family: var(--text-font);
  color: var(--secondary-color);
  font-size: 2rem;
  width: 75%;
  margin: 3rem 0 4rem 0;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderImg = styled.img`
  mask-image: url(${HeaderMask});
  mask-repeat: no-repeat;
  mask-size: contain;
  width: 50rem;
`;

const LearnMoreButton = styled.a`
  margin: 0;
  text-decoration: none;
  font-size: 2rem;
  padding: 1rem 3rem;
  background: var(--highlight-color);
  border-radius: 4px;
  color: var(--bg-color);
`;

export default Home;
