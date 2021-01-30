import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const RecipeCard = ({ recipe }) => {
  return (
    <Card key={recipe.title}>
      <FoodImage src={recipe.image} alt={`${recipe.title}`} />
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
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  /* border: 3px solid black; */
  overflow: hidden;
  background: #eeeeee;
  width: 268px;
  height: 343px;
  justify-content: left;
  filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.25));
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
  font-family: 'Prompt', sans-serif;
  font-size: 14px;
  align-self: flex-start;
  text-align: left;
  color: black;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SourceName = styled.div`
  font-family: 'Prompt', sans-serif;
  font-size: 14px;
  align-self: flex-start;
  text-align: left;
  font-style: italic;
  color: #696969;
`;

const CookTime = styled.div``;

export default RecipeCard;
