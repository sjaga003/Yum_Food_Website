import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipes } from '../actions/recipeCardsAction';
import RecipeCard from './RecipeCard/RecipeCard';
import { mockRecipeCards } from '../api';

import CookBookCard from './CookBookCard';
const Recipes = ({ isCookBookOpen, setIsCookBookOpen }) => {
  const recipeCards = mockRecipeCards();
  // const recipeCards = useSelector((state) => state.recipeCards);
  // console.log(recipeCards);
  const dispatch = useDispatch();
  const cookBookRef = useRef();
  const [cookBookList, setCookBookList] = useState([]);

  // useEffect(() => {
  //   dispatch(loadRecipes(10));
  // }, []);

  // useEffect(() => {
  //   console.log('HI');
  //   console.log(recipeCards);
  // }, [recipeCards]);

  const cookBookButtonVariant = {
    show: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <RecipeContainer>
      <AnimateSharedLayout type="switch">
        <AnimatePresence>
          <CardContainer>
            {recipeCards.recipes.results &&
              recipeCards.recipes.results.map((recipe) => {
                return (
                  <RecipeCard
                    cookBookRef={cookBookRef}
                    setCookBookList={setCookBookList}
                    cookBookList={cookBookList}
                    isCookBookOpen={isCookBookOpen}
                    setIsCookBookOpen={setIsCookBookOpen}
                    key={`recipe-${recipe.id}`}
                    recipe={recipe}
                  />
                );
              })}
          </CardContainer>

          <CookBook
            initial={{ right: -320 }}
            animate={
              isCookBookOpen
                ? { right: -10, transition: { type: 'spring', damping: 15 } }
                : { right: -320, transition: { type: 'spring', damping: 13 } }
            }
            key="cookbook"
            ref={cookBookRef}
          >
            <ButtonContainer
              variants={cookBookButtonVariant}
              animate={!isCookBookOpen ? 'show' : 'hide'}
              whileHover={'show'}
            >
              <ToggleButton
                onClick={() => setIsCookBookOpen(!isCookBookOpen)}
              ></ToggleButton>
            </ButtonContainer>

            <CookBookCards>
              {isCookBookOpen && <CookBookTitle>Cookbook</CookBookTitle>}
              {isCookBookOpen &&
                cookBookList &&
                cookBookList.map((entryId) => {
                  const recipe = recipeCards.recipes.results.find(
                    (element) => element.id === entryId
                  );
                  return (
                    <CookBookCard
                      key={`cookBookList-${recipe.id}`}
                      recipe={recipe}
                      setCookBookList={setCookBookList}
                      cookBookList={cookBookList}
                    />
                  );
                })}
            </CookBookCards>
          </CookBook>
        </AnimatePresence>
      </AnimateSharedLayout>
    </RecipeContainer>
  );
};

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-column-gap: 64px;
  grid-row-gap: 32px;
  justify-content: center;
`;

const RecipeContainer = styled.div`
  height: 300vh;
  display: flex;
  flex-direction: column;
`;

const CookBook = styled(motion.div)`
  background: var(--highlight-color);
  font-family: 'Montserrat', sans-serif;
  margin-top: 300px;
  padding: 30px;
  position: fixed;
  top: -300px;
  right: 0;
  width: 400px;
  height: 100vh;
  border-radius: 50px 0px 0px 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: hidden;
`;

const CookBookCards = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ToggleButton = styled(motion.button)`
  width: 12px;
  height: 500px;
  border-radius: 99999px;
  border: 0;
  padding: 0;
  font-size: 100%;
  background: #e89209;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  margin-right: 20px;
  width: 30px;
`;

const CookBookTitle = styled(motion.span)`
  color: var(--bg-color);
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 600;
`;

export default Recipes;
