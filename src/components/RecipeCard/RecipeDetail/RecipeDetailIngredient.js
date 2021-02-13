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
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background: white;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  padding: 15px;
  max-height: 180px;
  max-width: 180px;
  min-height: 180px;
  min-width: 180px;
`;
const IngredientImage = styled(motion.div)`
  width: 80px;
  height: 80px;
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
  justify-self: flex-end;
  margin-top: 10px;
`;

const IngredientAmount = styled(motion.div)`
  word-wrap: break-word;
  margin-top: 10px;
`;

export default RecipeDetailIngredient;
