import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import {
  faBreadSlice,
  faCircleNotch,
  faLeaf,
  faSeedling,
  faSpinner,
  faSync,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DairyIcon from '../images/Dairy.svg';
import NoImageFound from '../images/no_ingredient_image.jpg';

const RecipeDetail = ({ isDetailOpen, setIsDetailOpen, recipe, recipeId }) => {
  return recipe ? (
    <CardShadow
      className="shadow"
      onClick={(e) => {
        if (e.target.classList.contains('shadow')) {
          setIsDetailOpen(false);
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
                  <AllergyContainer>
                    <AllergyIconContainer>
                      <AllergyIcon icon={faBreadSlice} />
                    </AllergyIconContainer>
                    <AllergyLabel>Gluten Free</AllergyLabel>
                  </AllergyContainer>
                )}
                {recipe.dairyFree && (
                  <AllergyContainer>
                    <AllergyIconContainer>
                      <img src={DairyIcon} alt="" />
                    </AllergyIconContainer>
                    <AllergyLabel>Dairy Free</AllergyLabel>
                  </AllergyContainer>
                )}
                {recipe.vegetarian && (
                  <AllergyContainer>
                    <AllergyIconContainer>
                      <AllergyIcon icon={faLeaf} />
                    </AllergyIconContainer>
                    <AllergyLabel>Vegetarian</AllergyLabel>
                  </AllergyContainer>
                )}
                {recipe.began && (
                  <AllergyContainer>
                    <AllergyIconContainer>
                      <AllergyIcon icon={faSeedling} />
                    </AllergyIconContainer>
                    <AllergyLabel>Vegan</AllergyLabel>
                  </AllergyContainer>
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
                {recipe.extendedIngredients.map((item) => (
                  <IngredientCard key={`IngredientCard-${item.id}`}>
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
                      {Math.round((item.amount + Number.EPSILON) * 100) / 100}{' '}
                      {item.unit}
                    </IngredientAmount>
                  </IngredientCard>
                ))}
              </IngredientCards>
            </div>
            <div>
              <SubtitleHeader>Instructions</SubtitleHeader>
              <RecipeInstructions>
                {recipe.analyzedInstructions[0].steps.map((instruction) => (
                  <RecipeInstruction>
                    <InstructionNumber>#{instruction.number}</InstructionNumber>
                    <InstructionText>{instruction.step}</InstructionText>
                  </RecipeInstruction>
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
  font-size: 160px;
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
const RecipeName = styled(motion.div)`
  font-size: 36px;
  margin-bottom: 20px;
`;

const DividerLine = styled(motion.svg)`
  margin-bottom: 20px;
`;

const AllergyInfo = styled(motion.div)`
  margin-bottom: 20px;
`;

const AllergyContainer = styled(motion.div)`
  margin-bottom: 11px;
  display: flex;
  flex-direction: row;
`;

const AllergyIconContainer = styled(motion.div)`
  width: 30px;
  text-align: center;
`;
const AllergyIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  width: 18px;
`;

const AllergyLabel = styled(motion.span)``;

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

const RecipeInstructions = styled(motion.div)``;
const RecipeInstruction = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  padding: 30px;
`;
const InstructionNumber = styled(motion.span)`
  font-weight: 600;
  font-size: 24px;
  color: var(--highlight-color);
  margin-right: 100px;
`;
const InstructionText = styled(motion.span)`
  font-size: 18px;
`;
export default RecipeDetail;
