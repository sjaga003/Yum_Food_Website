import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const RecipeCard = ({ recipe }) => {
  return (
    recipe.image && (
      <Card data-testid="recipeCard">
        <FoodImage
          data-testid="recipeCardImage"
          src={recipe.image}
          alt={`${recipe.title}`}
        />
        <FoodInfo>
          <Title>{recipe.title}</Title>
          <BottomRow>
            <SourceName>{recipe.sourceName}</SourceName>
            <CookTime>
              <FontAwesomeIcon icon={faStopwatch} /> {recipe.readyInMinutes}
            </CookTime>
          </BottomRow>
        </FoodInfo>
      </Card>
    )
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  /* border: 1px solid lightgray; */
  overflow: hidden;
  background: #f4f7fc;
  width: 268px;
  height: 343px;
  justify-content: left;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
`;

const FoodImage = styled.img`
  height: 236px;
  object-fit: cover;
`;

const FoodInfo = styled.div`
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  align-self: flex-start;
  text-align: left;
  color: var(--text-color);
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SourceName = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  align-self: flex-start;
  text-align: left;
  font-style: italic;
  color: #696969;
`;

const CookTime = styled.div`
  font-weight: 600;
`;

export default RecipeCard;
