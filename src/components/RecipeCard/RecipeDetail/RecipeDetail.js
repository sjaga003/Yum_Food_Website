import { motion } from 'framer-motion';
import React from 'react';
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

const RecipeDetail = ({
  recipeCardState,
  setRecipeCardState,
  recipe,
  recipeId,
}) => {
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
                <path d="M0 5H198" stroke="#FFB902" strokeWidth="9" />
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
                    iconName={DairyIcon}
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
                  <StatData>{recipe.servings}</StatData>
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
                    <RecipeDetailIngredient item={item} />
                  ))}
              </IngredientCards>
            </div>
            <div>
              <SubtitleHeader>Instructions</SubtitleHeader>
              <RecipeInstructions>
                {recipe.analyzedInstructions[0] &&
                  recipe.analyzedInstructions[0].steps.map((instruction) => (
                    <RecipeDetailInstruction
                      instruction={instruction}
                      recipe={recipe}
                    />
                  ))}
              </RecipeInstructions>
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
  font-size: 100px;
  color: #ccc;
  will-change: transform;
  display: inline-block;
`;

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  /* overflow-y: scroll; */
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 90vh;
  background: #f4f7fc;
`;

const CardContent = styled(motion.div)`
  overflow: auto;
  height: 100%;
  padding: 20px;
  &::-webkit-scrollbar {
    width: 0.4rem;
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
`;

const RecipeImage = styled(motion.img)`
  object-fit: cover;
  width: 100%;
  border-radius: 10px;
`;
const Header = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;
const ImageContainer = styled(motion.div)`
  width: 50%;
`;
const InfoContainer = styled(motion.div)`
  width: 50%;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  height: 350px;
  justify-content: center;
`;

const AllergyInfo = styled(motion.div)`
  margin-bottom: 20px;
`;

const RecipeName = styled(motion.div)`
  font-size: 36px;
  margin-bottom: 20px;
`;

const DividerLine = styled(motion.svg)`
  margin-bottom: 20px;
`;

const RecipeStats = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StatBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatLabel = styled(motion.span)`
  color: rgba(155, 155, 155);
  font-size: 18px;
`;
const StatData = styled(motion.span)`
  font-size: 18px;
`;

const RecipeBody = styled(motion.div)``;

const SubtitleHeader = styled(motion.div)`
  margin-top: 30px;
  font-size: 32px;
  margin-bottom: 32px;
`;

const IngredientCards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-column-gap: 30px;
  grid-row-gap: 20px;
  justify-content: center;
  align-items: center;
`;

const RecipeInstructions = styled(motion.div)``;

export default RecipeDetail;
