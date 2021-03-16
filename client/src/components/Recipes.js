import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadRandomRecipes } from '../actions/recipeCardsAction';
import RecipeCard from './RecipeCard/RecipeCard';
import { mockRecipeCards } from '../api';

const containerFadeIn = {
  flat: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 100,
    transition: {
      type: 'tween',
    },
  },
};

const Recipes = ({
  isCookBookOpen,
  setIsCookBookOpen,
  cookBookRef,
  fromCookBook,
}) => {
  // const recipeCards = mockRecipeCards();
  const recipeCards = useSelector((state) => state.recipeCards);
  const cookBook = useSelector((state) => state.cookBook);
  // console.log(recipeCards);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadRandomRecipes(5));
  // }, []);

  // useEffect(() => {
  //   console.log('HI');
  //   console.log(recipeCards);
  // }, [recipeCards]);

  return (
    <>
      <RecipeContainer>
        <CardContainer>
          {recipeCards.recipes.results &&
            recipeCards.recipes.results.map((recipe, index) => {
              if (fromCookBook) {
                return (
                  <RecipeCard
                    cookBookRef={cookBookRef}
                    isCookBookOpen={isCookBookOpen}
                    setIsCookBookOpen={setIsCookBookOpen}
                    key={`recipe-${recipe.id}`}
                    index={index}
                    recipe={recipe}
                  />
                );
              }

              if (!cookBook?.some((el) => el.id === recipe.id)) {
                return (
                  <RecipeCard
                    cookBookRef={cookBookRef}
                    isCookBookOpen={isCookBookOpen}
                    setIsCookBookOpen={setIsCookBookOpen}
                    key={`recipe-${recipe.id}`}
                    index={index}
                    recipe={recipe}
                  />
                );
              }
            })}
        </CardContainer>
      </RecipeContainer>
    </>
  );
};

const CardContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 3.2rem;
  grid-row-gap: 3.2rem;
  justify-content: center;
`;

const RecipeContainer = styled.div`
  padding: 10rem 0;
  /* height: 100vh; //Keeps div from disappearing without cards */
  display: flex;
  flex-direction: column;
`;

export default Recipes;
