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
  height: 60vh;
  margin: 0 0 600px 0;
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Hero = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 72px;
  font-weight: 600;
`;

const HeroDescription = styled.div`
  font-family: 'Roboto', sans-serif;
  color: var(--secondary-color);
  font-size: 20px;
  width: 75%;
  margin: 30px 0px 40px 0px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

const HeaderImg = styled.img`
  mask-image: url(${HeaderMask});
  mask-repeat: no-repeat;
  mask-size: contain;

  width: 500px;
`;

const LearnMoreButton = styled.a`
  margin: 0px 0px;
  text-decoration: none;
  font-size: 20px;
  padding: 10px 30px;
  background: var(--highlight-color);
  border-radius: 4px;
  color: var(--bg-color);
`;

export default Home;
