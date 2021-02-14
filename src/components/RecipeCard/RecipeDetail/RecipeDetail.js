import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  faBreadSlice,
  faLeaf,
  faSeedling,
  faSync,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DairyIcon from '../../../images/Dairy.svg';
import AllergyMarker from './AllergyMarker';
import RecipeDetailIngredient from './RecipeDetailIngredient';
import RecipeDetailInstruction from './RecipeDetailInstruction';

import NutritionalInfo from './NutritionalInfo';

const RecipeDetail = ({
  recipeCardState,
  setRecipeCardState,
  recipe,
  recipeId,
}) => {
  const [servingSize, setServingSize] = useState(recipe.servings);

  return recipe ? (
    <CardShadow
      className="shadow"
      onClick={(e) => {
        if (e.target.classList.contains('shadow')) {
          setRecipeCardState({ ...recipeCardState, isDetailOpen: false });
          document.body.style.overflow = 'auto';
        }
      }}
    >
      <Card layoutId={`recipeCard-${recipe.id}`}>
        <CardContent>
          <Header>
            <ImageContainer>
              <RecipeImage src={recipe.image} alt={`${recipe.title}`} />
            </ImageContainer>
            <InfoContainer>
              <RecipeName>{recipe.title}</RecipeName>
              <DividerLine
                width="198"
                height="10"
                viewBox="0 0 198 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 5H198"
                  stroke="var(--highlight-color)"
                  strokeWidth="9"
                />
              </DividerLine>
              <AllergyInfo>
                {recipe.glutenFree && (
                  <AllergyMarker
                    iconName={faBreadSlice}
                    labelName={'Gluten Free'}
                    external={false}
                  />
                )}
                {recipe.dairyFree && (
                  <AllergyMarker
                    iconName={
                      <svg
                        viewBox="0 0 10 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.2 1H7.8C8.39998 1 8.39998 2.14607 7.8 2.14607H2.2C1.6 2.14607 1.6 1 2.2 1Z"
                          fill="var(--text-color)"
                        />
                        <path
                          d="M2.6 3.10112H7.4C7.4 4.82022 9 7.68539 9 8.25843V16.8539C9 17.427 8.4 18 7.8 18H2.2C1.6 18 1 17.236 1 16.6629V8.25843C1 7.68539 2.6 4.82022 2.6 3.10112Z"
                          fill="var(--text-color)"
                        />
                        <path
                          d="M7.8 2.14607C8.39998 2.14607 8.39998 1 7.8 1H2.2C1.6 1 1.6 2.14607 2.2 2.14607M7.8 2.14607C6.69546 2.14607 1.60001 2.14607 2.2 2.14607M7.8 2.14607H2.2M2.6 3.10112H7.4C7.4 4.82022 9 7.68539 9 8.25843V16.8539C9 17.427 8.4 18 7.8 18H2.2C1.6 18 1 17.236 1 16.6629V8.25843C1 7.68539 2.6 4.82022 2.6 3.10112Z"
                          stroke="var(--text-color)"
                        />
                      </svg>
                    }
                    labelName={'Dairy Free'}
                    external={true}
                  />
                )}
                {recipe.vegetarian && (
                  <AllergyMarker
                    iconName={faLeaf}
                    labelName={'Vegetarian'}
                    external={false}
                  />
                )}
                {recipe.vegan && (
                  <AllergyMarker
                    iconName={faSeedling}
                    labelName={'Vegan'}
                    external={false}
                  />
                )}
              </AllergyInfo>
              <RecipeStats>
                <StatBox>
                  <StatLabel>Recipe By</StatLabel>
                  <StatData>{recipe.sourceName}</StatData>
                </StatBox>
                <StatBox>
                  <StatLabel>Cook Time</StatLabel>
                  <StatData>{recipe.readyInMinutes}m</StatData>
                </StatBox>
                <StatBox>
                  <StatLabel>Servings</StatLabel>
                  <StatData>
                    <ServingContainer>
                      <button
                        onClick={() =>
                          servingSize > 1 ? setServingSize(servingSize - 1) : ''
                        }
                      >
                        -
                      </button>
                      <input
                        readOnly={true}
                        type="number"
                        value={servingSize}
                      />
                      <button onClick={() => setServingSize(servingSize + 1)}>
                        +
                      </button>
                    </ServingContainer>
                  </StatData>
                </StatBox>
              </RecipeStats>
            </InfoContainer>
          </Header>
          <RecipeBody>
            <div>
              <SubtitleHeader>Ingredients</SubtitleHeader>
              <IngredientCards>
                {recipe.extendedIngredients &&
                  recipe.extendedIngredients.map((item) => (
                    <RecipeDetailIngredient
                      key={`RecipeDetailIngredient-${recipe.id}-${item.id}`}
                      item={item}
                      defaultServing={recipe.servings}
                      serving={servingSize}
                    />
                  ))}
              </IngredientCards>
            </div>
            <div>
              <SubtitleHeader>Instructions</SubtitleHeader>
              <>
                <RecipeInstructions>
                  {recipe.analyzedInstructions[0] &&
                    recipe.analyzedInstructions[0].steps.map((instruction) => (
                      <RecipeDetailInstruction
                        key={`RecipeInstruction-${recipe.key}-${instruction.number}`}
                        instruction={instruction}
                        recipe={recipe}
                      />
                    ))}
                </RecipeInstructions>
              </>
            </div>
            <div>
              <SubtitleHeader>Nutritional Information</SubtitleHeader>
              <NutritionContainer>
                <NutritionalInfo recipe={recipe} />
              </NutritionContainer>
            </div>
          </RecipeBody>
        </CardContent>
      </Card>
    </CardShadow>
  ) : (
    <CardShadow>
      <Card
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        layoutId={`recipeCard-${recipeId}`}
      >
        <SpinnerIcon size="lg" icon={faSync} spin />
      </Card>
    </CardShadow>
  );
};

const SpinnerIcon = styled(FontAwesomeIcon)`
  font-size: 10rem;
  color: #ccc;
  will-change: transform;
  display: inline-block;
`;

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &::-webkit-scrollbar {
    width: 1rem;
    height: 0.5rem;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--highlight-color);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #e2e2e2;
  }
  &::-webkit-resizer {
    display: none;
  }
  overflow-y: scroll;
`;

const Card = styled(motion.div)`
  width: 70%;
  border-radius: 1rem;
  padding: 2rem 2rem;
  background: white;
  position: absolute;
  will-change: transform;
  z-index: 10;
  color: black;
  top: 0;
  background: var(--card-color);
`;

const CardContent = styled(motion.div)`
  padding: 2rem;
`;

const RecipeImage = styled(motion.img)`
  object-fit: cover;
  width: 100%;
  border-radius: 10px;
`;
const Header = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const ImageContainer = styled(motion.div)``;

const InfoContainer = styled(motion.div)`
  width: 50%;
  padding-left: 3rem;
  display: flex;
  flex-direction: column;
`;

const AllergyInfo = styled(motion.div)`
  margin-bottom: 20px;
`;

const RecipeName = styled(motion.div)`
  font-size: 3.6rem;
  margin-bottom: 2rem;
`;

const DividerLine = styled(motion.svg)`
  margin-bottom: 2rem;
`;

const RecipeStats = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ServingContainer = styled(motion.div)`
  display: flex;
  height: 2.5rem;
  border-radius: 0.5rem;

  button {
    width: 2rem;
    color: #718096;
    height: 100%;
    cursor: pointer;
    background: #e2e8f0;
    border: 0;
    font-size: 1.8rem;
    &:focus {
      outline: 0;
      border: 0;
    }
    &:hover {
      background: #cbd5e0;
    }
  }

  input {
    width: 3rem;
    outline: 0;
    border: 0;
    text-align: center;
    display: flex;
    align-items: center;
    background: #e2e8f0;
    font-family: Roboto, sans-serif;
    font-size: 1.8rem;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const StatBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatLabel = styled(motion.span)`
  color: var(--secondary-color);
  font-size: 1.8rem;
`;
const StatData = styled(motion.span)`
  font-size: 1.8rem;
`;

const RecipeBody = styled(motion.div)``;

const SubtitleHeader = styled(motion.div)`
  margin-top: 3rem;
  font-size: 3.2rem;
  margin-bottom: 3.2rem;
`;

const InstructionContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const IngredientCards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, 18rem);
  grid-column-gap: 3rem;
  grid-row-gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const RecipeInstructions = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-self: center;
`;

const NutritionContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, 40rem);
  justify-items: center;
  padding-bottom: 3rem;
  justify-content: center;
  font-size: 1.6rem;
`;

export default RecipeDetail;
