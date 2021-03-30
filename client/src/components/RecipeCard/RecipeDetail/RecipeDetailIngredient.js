import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import NoImageFound from '../../../images/no_ingredient_image.jpg';
import size from '../../../styles/responsiveStyles';

const RecipeDetailIngredient = ({
  item,
  serving,
  defaultServing,
  ingredientsList,
}) => {
  return (
    <IngredientCard>
      <IngredientImage>
        <img
          src={
            ingredientsList.find(
              (el) =>
                el.id === item.id ||
                item.name.match(new RegExp('\\b' + el.name + '\\b')) != null
            ) !== undefined
              ? `https://spoonacular.com/cdn/ingredients_250x250/${
                  ingredientsList.filter((el) => {
                    return (
                      el.id === item.id ||
                      item.name.match(new RegExp('\\b' + el.name + '\\b')) !=
                        null
                    );
                  })[0].image
                }`
              : NoImageFound
          }
          alt={item.name}
        />
      </IngredientImage>
      <IngredientName>{item.name}</IngredientName>
      <IngredientAmount>
        {Math.round(
          ((item.amount / defaultServing) * serving + Number.EPSILON) * 100
        ) / 100}{' '}
        {item.unit}
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
  height: 20rem;
  width: 20rem;
  font-size: 1.4rem;
  overflow: hidden;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    height: 15rem;
    width: 15rem;
  }
  @media (${size.xs}) {
    height: 13rem;
    width: 13rem;
  }
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
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    width: 6rem;
    height: 6rem;
  }
  @media (${size.xs}) {
    width: 4rem;
    height: 4rem;
  }
`;

const IngredientName = styled(motion.span)`
  text-align: center;
  text-transform: capitalize;
  font-family: var(--header-font);
  color: var(--header-color);
  font-size: 1.6rem;
  margin-top: 1rem;
  font-weight: 600;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    font-size: 1.4rem;
  }
  @media (${size.xs}) {
  }
`;

const IngredientAmount = styled(motion.div)`
  word-wrap: break-word;
  margin-top: 1rem;
  font-size: 1.6rem;
  color: var(--header-color);
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    font-size: 1.4rem;
  }
  @media (${size.xs}) {
  }
`;

export default RecipeDetailIngredient;
