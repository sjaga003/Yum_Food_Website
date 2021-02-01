import React, { useEffect } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipes } from './actions/recipeCardsAction';
import RecipeCard from './components/RecipeCard/RecipeCard';
import styled from 'styled-components';
import '@fontsource/prompt';
import '@fontsource/roboto';
import '@fontsource/montserrat';
import { mockRecipeCards } from './api';
import Nav from './components/Nav';
import Home from './components/Home';
import { GlobalStyle } from './components/GlobalStyles';

function App() {
  const recipeCards = mockRecipeCards();
  // const recipeCards = useSelector((state) => state.recipeCards);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Content>
        <Nav />
        <Home />
        <CardContainer>
          {recipeCards &&
            recipeCards.recipes.map((recipe) => {
              return <RecipeCard key={recipe.title} recipe={recipe} />;
            })}
        </CardContainer>
      </Content>
    </div>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  min-height: 100vh;
  padding: 0px 15vw;
  overflow-x: hidden;
  height: 200vh;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-column-gap: 64px;
  grid-row-gap: 32px;
  justify-content: center;
`;

export default App;
