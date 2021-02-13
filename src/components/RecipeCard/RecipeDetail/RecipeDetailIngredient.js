import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import NoImageFound from '../../../images/no_ingredient_image.jpg';

const RecipeDetailIngredient = ({ item, serving, defaultServing }) => {
  console.log(`hello ${typeof serving}, ${typeof defaultServing}}`);
  return (
    <IngredientCard>
      <IngredientImage>
        <img
          src={
            item.image
              ? `https://spoonacular.com/cdn/ingredients_250x250/${item.image}`
              : NoImageFound
          }
          alt={item.name}
        />
      </IngredientImage>
      <IngredientName>{item.name}</IngredientName>
      <IngredientAmount>
        {Math.round(
          ((item.measures.us.amount / defaultServing) * serving +
            Number.EPSILON) *
            100
        ) / 100}{' '}
        {item.measures.us.unitShort}
      </IngredientAmount>
    </IngredientCard>
  );
};

const IngredientCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  background: white;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  padding: 1.5rem;
  max-height: 18rem;
  max-width: 18rem;
  min-height: 18rem;
  min-width: 18rem;
  font-size: 1.4rem;
`;
const IngredientImage = styled(motion.div)`
  width: 8rem;
  height: 8rem;
  justify-content: center;
  align-items: center;
  display: flex;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

const IngredientName = styled(motion.span)`
  text-align: center;
  text-transform: capitalize;

  margin-top: 1rem;
  font-weight: 600;
`;

const IngredientAmount = styled(motion.div)`
  word-wrap: break-word;
  margin-top: 1rem;
`;

export default RecipeDetailIngredient;
