import {
  faBreadSlice,
  faLeaf,
  faSeedling,
  faSync,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import size from '../../../responsiveStyles';
import AllergyMarker from './AllergyMarker';
import NutritionalInfo from './NutritionalInfo';
import RecipeDetailIngredient from './RecipeDetailIngredient';
import RecipeDetailInstruction from './RecipeDetailInstruction';

const RecipeDetail = ({
  recipeCardState,
  setRecipeCardState,
  recipe,
  recipeId,
}) => {
  const [servingSize, setServingSize] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    //Moved function into useEffect to remove ESLint dependency warning
    //Only supposed to run once on first render []
    const createIngredientsList = () => {
      let ingredients = [];
      if (!recipe.analyzedInstructions[0]) {
        return ingredients;
      }
      recipe.analyzedInstructions[0].steps.forEach((step) => {
        step.ingredients.forEach((ingredient) => {
          if (
            ingredient.image &&
            !ingredients.some((el) => el.id === ingredient.id)
          ) {
            ingredients.push({
              id: ingredient.id,
              image: ingredient.image,
              name: ingredient.name,
            });
          }
        });
      });
      return ingredients;
    };

    setIngredientsList(createIngredientsList());
  }, [recipe.analyzedInstructions]);

  useEffect(() => {
    recipe && setServingSize(recipe.servings);
  }, [recipe]);

  return recipe ? (
    <CardShadow
      className="shadow"
      onClick={(e) => {
        if (e.target.classList.contains('shadow')) {
          setRecipeCardState({ ...recipeCardState, isDetailOpen: false });
          document.body.style.overflowY = 'auto';
        }
      }}
    >
      <Card layoutId={`recipeCard-${recipe.id}`}>
        <CardContent>
          <TopRow>
            <FontAwesomeIcon
              onClick={() => {
                setRecipeCardState({ ...recipeCardState, isDetailOpen: false });
                document.body.style.overflowY = 'auto';
              }}
              icon={faTimes}
            />
          </TopRow>
          <Header>
            <ImageContainer>
              <RecipeImage src={recipe.image} alt={`${recipe.title}`} />
            </ImageContainer>
            <InfoContainer>
              <UpperContainer>
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
              </UpperContainer>
              <LowerContainer>
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
                            servingSize > 1
                              ? setServingSize(servingSize - 1)
                              : ''
                          }
                        >
                          -
                        </button>
                        <input
                          readOnly={true}
                          type="number"
                          value={servingSize}
                          style={{ color: 'var(--header-color)' }}
                        />
                        <button onClick={() => setServingSize(servingSize + 1)}>
                          +
                        </button>
                      </ServingContainer>
                    </StatData>
                  </StatBox>
                </RecipeStats>
              </LowerContainer>
            </InfoContainer>
          </Header>
          <RecipeBody>
            <div>
              <SubtitleHeader>Ingredients</SubtitleHeader>
              <IngredientCards>
                {recipe.nutrition.ingredients &&
                  recipe.nutrition.ingredients.map((item, index) => (
                    <RecipeDetailIngredient
                      key={`RecipeDetailIngredient-${recipe.id}-${item.id}-${index}`}
                      item={item}
                      ingredientsList={ingredientsList}
                      defaultServing={recipe.servings}
                      serving={servingSize}
                    />
                  ))}
              </IngredientCards>
            </div>
            <div>
              {recipe.analyzedInstructions[0] && (
                <SubtitleHeader>Instructions</SubtitleHeader>
              )}

              <RecipeInstructions>
                <InstructionsContainer>
                  {recipe.analyzedInstructions[0] &&
                    recipe.analyzedInstructions[0].steps.map((instruction) => (
                      <RecipeDetailInstruction
                        key={`RecipeInstruction-${recipe.key}-${instruction.number}`}
                        instruction={instruction}
                        recipe={recipe}
                      />
                    ))}
                </InstructionsContainer>
              </RecipeInstructions>
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
  color: var(--text-color);
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
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 6rem;
  background: white;
  position: absolute;
  will-change: transform;
  z-index: 10;
  color: black;
  top: 0;
  background: var(--card-color);
  overflow: hidden;
  @media (${size.xl}) {
    height: 100%;
  }
  @media (${size.lg}) {
    width: 90%;
  }
  @media (${size.md}) {
    width: 100%;
    border-radius: 0;
    padding: 2rem 4rem;
  }
  @media (${size.sm}) {
    padding: 1rem 1rem;
  }
  @media (${size.xs}) {
  }
`;

const CardContent = styled(motion.div)`
  padding: 2rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    padding: 0;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const RecipeImage = styled(motion.img)`
  object-fit: cover;
  width: 100%;
  border-radius: 10px;
`;

const TopRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 3rem;
  svg {
    cursor: pointer;
    font-size: 2.4rem;
    color: var(--text-color);
  }
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    flex-wrap: wrap;
  }
  @media (${size.xs}) {
  }
`;
const ImageContainer = styled(motion.div)`
  width: 50rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    width: 100%;
  }
  @media (${size.xs}) {
  }
`;

const InfoContainer = styled(motion.div)`
  width: 50%;
  padding-left: 3rem;
  display: flex;
  flex-direction: column;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    padding: 0;
    width: 100%;
  }
  @media (${size.xs}) {
  }
`;

const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

const LowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AllergyInfo = styled(motion.div)`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }
  @media (${size.xs}) {
  }
`;

const RecipeName = styled(motion.div)`
  font-size: 3.6rem;
  margin-bottom: 2rem;
  color: var(--header-color);
  font-family: var(--header-font);
  font-weight: 600;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    font-size: 2.8rem;
  }
  @media (${size.md}) {
    font-size: 2.4rem;
  }
  @media (${size.sm}) {
    font-size: 3.2rem;
  }
  @media (${size.xs}) {
    font-size: 2.8rem;
  }
`;

const DividerLine = styled(motion.svg)`
  margin-bottom: 2rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    margin-bottom: 1rem;
  }
`;

const RecipeStats = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    flex-wrap: wrap;
    justify-content: center;
  }
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

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    button {
      font-size: 1.6rem;
    }
    input {
      font-size: 1.6rem;
    }
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const StatBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    margin: 2rem 2rem;
  }
`;

const StatLabel = styled(motion.span)`
  color: var(--header-color);
  font-family: var(--header-font);
  font-weight: 600;
  font-size: 1.8rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    font-size: 1.6rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;
const StatData = styled(motion.span)`
  font-size: 1.8rem;
  color: var(--text-color);
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    font-size: 1.6rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
  }
`;

const RecipeBody = styled(motion.div)``;

const SubtitleHeader = styled(motion.div)`
  margin-top: 6rem;
  font-size: 3.2rem;
  margin-bottom: 3.2rem;
  font-family: var(--header-font);
  color: var(--header-color);
  font-weight: 600;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    font-size: 3rem;
  }
`;

const IngredientCards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 2rem;
  justify-items: center;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
    grid-column-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
  @media (${size.xs}) {
    grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  }
`;

const RecipeInstructions = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
`;

const InstructionsContainer = styled.div``;

const NutritionContainer = styled(motion.div)`
  display: flex;
  justify-items: center;
  width: 100%;

  padding-bottom: 3rem;
  justify-content: center;
  font-size: 1.6rem;
  flex-wrap: wrap;
`;

export default RecipeDetail;
