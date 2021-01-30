import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipes } from './actions/recipeCardsAction';
import RecipeCard from './components/RecipeCard/RecipeCard';
import styled from 'styled-components';
import '@fontsource/prompt';
import { mockRecipeCards } from './api';

function App() {
  const recipeCards = mockRecipeCards();
  // const recipeCards = useSelector((state) => state.recipeCards);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <div className="App">
      <button data-testid="button" onClick={() => dispatch(loadRecipes(3))}>
        TEST
      </button>
      <CardContainer>
        {recipeCards &&
          recipeCards.recipes.map((recipe) => {
            return <RecipeCard key={recipe.title} recipe={recipe} />;
          })}
      </CardContainer>
    </div>
  );
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-column-gap: 64px;
  grid-row-gap: 32px;
  justify-content: center;
`;

export default App;
