import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loadPreviewRecipes } from '../../../actions/recipeCardsAction';
import {
  recipePreviewAppetizer,
  recipePreviewBreakfast,
  recipePreviewDessert,
  recipePreviewPopular,
  recipePreviewVegetarian,
} from '../../../recipePreviewData';
import size from '../../../styles/responsiveStyles';
import Recipes from '../../Recipes';
import RecipePreviewButton from './RecipePreviewButton';

const RecipePreview = ({ isCookBookOpen, setIsCookBookOpen, cookBookRef }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //Added deps to remove ESLint Warning
    //Only supposed to run once on first render []
    dispatch(loadPreviewRecipes(recipePreviewPopular()));
  }, [dispatch]);

  const [activeButton, setActiveButton] = useState('Popular');

  return (
    <RecipePreviewSection>
      <Navigation>
        <Header>
          <Heading>Explore</Heading> <SubHeading>Our Recipes</SubHeading>
        </Header>
        <ButtonContainer>
          <RecipePreviewButton
            name={'Popular'}
            recipes={recipePreviewPopular()}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <RecipePreviewButton
            name={'Breakfast'}
            recipes={recipePreviewBreakfast()}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <RecipePreviewButton
            name={'Appetizer'}
            recipes={recipePreviewAppetizer()}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <RecipePreviewButton
            name={'Dessert'}
            recipes={recipePreviewDessert()}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
          <RecipePreviewButton
            name={'Vegetarian'}
            recipes={recipePreviewVegetarian()}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </ButtonContainer>
      </Navigation>

      <Recipes
        isCookBookOpen={isCookBookOpen}
        setIsCookBookOpen={setIsCookBookOpen}
        cookBookRef={cookBookRef}
        fromPreview={true}
      />
    </RecipePreviewSection>
  );
};

const RecipePreviewSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 300px;
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

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.span`
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

const SubHeading = styled.span`
  font-family: var(--header-font);
  font-size: 3.6rem;
  color: var(--header-color);
  font-weight: 600;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    margin-bottom: 2rem;
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    font-size: 2.8rem;
  }
  @media (${size.xs}) {
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background: #e2e8f0;
  height: 100%;
  width: 60rem;
  padding: 1rem;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    flex-wrap: wrap;
  }
  @media (${size.md}) {
    width: 100%;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

export default RecipePreview;
