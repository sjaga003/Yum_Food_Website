import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { loadPreviewRecipes } from '../actions/recipeCardsAction';
import {
  recipePreviewAppetizer,
  recipePreviewBreakfast,
  recipePreviewDessert,
  recipePreviewPopular,
  recipePreviewVegetarian,
} from '../recipePreviewData';
import Recipes from './Recipes';

const RecipePreview = ({ isCookBookOpen, setIsCookBookOpen, cookBookRef }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPreviewRecipes(recipePreviewPopular()));
    setActiveButton('A');
  }, []);

  const [activeButton, setActiveButton] = useState('Popular');

  return (
    <RecipePreviewSection>
      <Navigation>
        <Header>
          <Heading>Explore</Heading> <SubHeading>Our Recipes</SubHeading>
        </Header>
        <ButtonContainer>
          <Button
            name="Popular"
            active={activeButton === 'Popular'}
            onClick={() => {
              dispatch(loadPreviewRecipes(recipePreviewPopular()));
              setActiveButton('Popular');
            }}
          >
            Popular
          </Button>
          <Button
            name="Breakfast"
            active={activeButton === 'Breakfast'}
            onClick={() => {
              dispatch(loadPreviewRecipes(recipePreviewBreakfast()));
              setActiveButton('Breakfast');
            }}
          >
            Breakfast
          </Button>
          <Button
            name="Appetizer"
            active={activeButton === 'Appetizer'}
            onClick={() => {
              dispatch(loadPreviewRecipes(recipePreviewAppetizer()));
              setActiveButton('Appetizer');
            }}
          >
            Appetizer
          </Button>
          <Button
            name="Dessert"
            active={activeButton === 'Dessert'}
            onClick={() => {
              dispatch(loadPreviewRecipes(recipePreviewDessert()));
              setActiveButton('Dessert');
            }}
          >
            Dessert
          </Button>
          <Button
            name="Vegetarian"
            active={activeButton === 'Vegetarian'}
            onClick={() => {
              dispatch(loadPreviewRecipes(recipePreviewVegetarian()));
              setActiveButton('Vegetarian');
            }}
          >
            Vegetarian
          </Button>
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
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
`;

const SubHeading = styled.span`
  font-family: var(--header-font);
  font-size: 3.6rem;
  color: var(--header-color);
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background: #e2e8f0;
  height: 100%;
  width: 60rem;
  padding: 1rem;
`;

const Button = styled.button`
  border: 0;
  padding: 1rem 2rem;
  font-family: var(--text-font);
  font-size: 1.8rem;
  cursor: pointer;
  outline: none;
  background: transparent;
  color: var(--text-color);

  ${({ active }) =>
    active &&
    css`
      background: var(--highlight-color);
      color: white;
    `}
`;

export default RecipePreview;
