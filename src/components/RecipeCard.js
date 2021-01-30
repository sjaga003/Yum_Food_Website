import React from 'react';
import styled from 'styled-components';

const RecipeCard = ({ recipe }) => {
  return (
    <div key={recipe.title}>
      <img src={recipe.image} alt={`${recipe.title}-image`} />
      <div>{recipe.title}</div>
      <div>{recipe.sourceName}</div>
    </div>
  );
};

export default RecipeCard;
