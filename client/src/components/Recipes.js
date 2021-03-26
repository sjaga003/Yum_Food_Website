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
      <RecipeContainer
        style={fromCookBook ? { overflow: 'hidden' } : { overflow: 'unset' }}
      >
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
    grid-template-columns: repeat(auto-fit, minmax(29rem, 1fr));
  }
  @media (${size.md}) {
    grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr));
  }
  @media (${size.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  }
  @media (${size.xs}) {
    grid-template-columns: repeat(auto-fit, minmax(80%, 1fr));
  }
`;

const RecipeContainer = styled.div`
  padding: 3rem 1rem;

  /* height: 100vh; //Keeps div from disappearing without cards */
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default Recipes;
