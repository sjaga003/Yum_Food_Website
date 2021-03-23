import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import size from '../responsiveStyles';
import RecipeCard from './RecipeCard/RecipeCard';

const Recipes = ({
  isCookBookOpen,
  setIsCookBookOpen,
  cookBookRef,
  fromCookBook,
}) => {
  const recipeCards = useSelector((state) => state.recipeCards);
  const cookBook = useSelector((state) => state.cookBook);

  return (
    <>
      <RecipeContainer>
        <CardContainer>
          {fromCookBook &&
            cookBook.map((recipe, index) => {
              return (
                <RecipeCard
                  cookBookRef={cookBookRef}
                  isCookBookOpen={isCookBookOpen}
                  setIsCookBookOpen={setIsCookBookOpen}
                  key={`recipe-${recipe.recipeObject.id}`}
                  index={index}
                  databaseId={recipe._id}
                  recipe={recipe.recipeObject}
                  fromCookBook={fromCookBook}
                />
              );
            })}
          {!fromCookBook &&
            recipeCards.recipes.results &&
            recipeCards.recipes.results.map((recipe, index) => {
              if (!cookBook?.some((el) => el.recipeObject.id === recipe.id)) {
                return (
                  <RecipeCard
                    cookBookRef={cookBookRef}
                    isCookBookOpen={isCookBookOpen}
                    setIsCookBookOpen={setIsCookBookOpen}
                    key={`recipe-${recipe.id}`}
                    index={index}
                    recipe={recipe}
                    fromCookBook={false}
                  />
                );
              }
              return null;
            })}
        </CardContainer>
      </RecipeContainer>
    </>
  );
};

const CardContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-column-gap: 3.2rem;
  grid-row-gap: 3.2rem;
  justify-items: center;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const RecipeContainer = styled.div`
  padding: 10rem 0;
  /* height: 100vh; //Keeps div from disappearing without cards */
  display: flex;
  flex-direction: column;
`;

export default Recipes;
