import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { loadPreviewRecipes } from '../actions/recipeCardsAction';
import {
  recipePreviewBreakfast,
  recipePreviewPopular,
  recipePreviewAppetizer,
  recipePreviewDessert,
  recipePreviewVegetarian,
} from '../recipePreviewData';
import Recipes from './Recipes';

const RecipePreview = ({
  isCookBookOpen,
  setIsCookBookOpen,
  cookBookList,
  setCookBookList,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPreviewRecipes(recipePreviewPopular()));
    setActiveButton('A');
  }, []);

  const [activeButton, setActiveButton] = useState('');

  const activeButtonStyle = {
    background: 'red',
  };

  return (
    <RecipePreviewSection>
      <Navigation>
        <Header>
          <Heading>Explore</Heading> <SubHeading>Our Recipes</SubHeading>
        </Header>
        <ButtonContainer>
          <Button
            style={activeButton === 'A' ? { activeButtonStyle } : {}}
            active={activeButton === 'A'}
            onClick={() => {
              dispatch(loadPreviewRecipes(recipePreviewPopular()));
              setActiveButton('A');
            }}
          >
            Popular
          </Button>
          <Button
            style={activeButton === 'B' ? { activeButtonStyle } : {}}
            active={activeButton === 'B'}
            onClick={() => {
              dispatch(loadPreviewRecipes(recipePreviewBreakfast()));
              setActiveButton('B');
            }}
          >
            Breakfast
          </Button>
          <Button
            style={activeButton === 'C' ? { activeButtonStyle } : {}}
            active={activeButton === 'C'}
            onClick={() => {
              dispatch(loadPreviewRecipes(recipePreviewAppetizer()));

              setActiveButton('C');
            }}
          >
            Appetizer
          </Button>
          <Button
            style={activeButton === 'D' ? { activeButtonStyle } : {}}
            active={activeButton === 'D'}
            onClick={() => {
              dispatch(loadPreviewRecipes(recipePreviewDessert()));
              setActiveButton('D');
            }}
          >
            Dessert
          </Button>
          <Button
            style={activeButton === 'E' ? { activeButtonStyle } : {}}
            active={activeButton === 'E'}
            onClick={() => {
              dispatch(loadPreviewRecipes(recipePreviewVegetarian()));
              setActiveButton('E');
            }}
          >
            Vegetarian
          </Button>
        </ButtonContainer>
      </Navigation>
      <div>
        <Recipes
          cookBookList={cookBookList}
          setCookBookList={setCookBookList}
          isCookBookOpen={isCookBookOpen}
          setIsCookBookOpen={setIsCookBookOpen}
        />
      </div>
    </RecipePreviewSection>
  );
};

const RecipePreviewSection = styled.section`
  display: flex;
  flex-direction: column;
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
  font-family: 'Prompt', sans-serif;
  font-size: 2.4rem;
  color: var(--highlight-color);
`;

const SubHeading = styled.span`
  font-family: var(--text-font);
  font-size: 3.6rem;
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
  color: #718096;
  ${({ active }) =>
    active &&
    css`
      background: var(--highlight-color);
      color: white;
    `}
`;

export default RecipePreview;
