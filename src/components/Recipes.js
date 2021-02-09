import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipes } from '../actions/recipeCardsAction';
import RecipeCard from './RecipeCard/RecipeCard';
import { mockRecipeCards } from '../api';
import MissingImage from '../images/card_image_missing.svg';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Recipes = ({ isCookBookOpen, setIsCookBookOpen }) => {
  const recipeCards = mockRecipeCards();
  // const recipeCards = useSelector((state) => state.recipeCards);
  const dispatch = useDispatch();
  const cookBookRef = useRef();
  const [cookBookList, setCookBookList] = useState([]);

  // useEffect(() => {
  //   dispatch(loadRecipes(10));
  // }, []);

  // useEffect(() => {
  //   console.log(recipeCards);
  // }, [recipeCards]);

  const cookBookButtonVariant = {
    show: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <RecipeContainer>
      <AnimateSharedLayout type="switch">
        <AnimatePresence>
          <CardContainer>
            {recipeCards &&
              recipeCards.recipes.map((recipe) => {
                return (
                  <RecipeCard
                    cookBookRef={cookBookRef}
                    setCookBookList={setCookBookList}
                    cookBookList={cookBookList}
                    isCookBookOpen={isCookBookOpen}
                    setIsCookBookOpen={setIsCookBookOpen}
                    key={`recipe-${recipe.id}`}
                    recipe={recipe}
                  />
                );
              })}
          </CardContainer>

          <CookBook
            initial={{ right: -320 }}
            animate={
              isCookBookOpen
                ? { right: -10, transition: { type: 'spring', damping: 15 } }
                : { right: -320, transition: { type: 'spring', damping: 13 } }
            }
            key="cookbook"
            ref={cookBookRef}
          >
            <ButtonContainer
              variants={cookBookButtonVariant}
              animate={!isCookBookOpen ? 'show' : 'hide'}
              whileHover={'show'}
            >
              <ToggleButton
                onClick={() => setIsCookBookOpen(!isCookBookOpen)}
              ></ToggleButton>
            </ButtonContainer>

            <CookBookCards>
              {isCookBookOpen && <CookBookTitle>Cookbook</CookBookTitle>}
              {isCookBookOpen &&
                cookBookList &&
                cookBookList.map((entryId) => {
                  const recipe = recipeCards.recipes.find(
                    (element) => element.id === entryId
                  );
                  return (
                    <Card
                      key={`cookBookList-${recipe.id}`}
                      layout
                      layoutId={`recipeCard-${recipe.id}`}
                    >
                      <FoodImage
                        draggable={false}
                        data-testid="recipeCardImage"
                        src={recipe.image ? recipe.image : MissingImage}
                        alt={`${recipe.title}`}
                      />
                      <FoodInfo>
                        <Title>{recipe.title}</Title>
                      </FoodInfo>{' '}
                      <CloseButton
                        initial={{
                          fill: 'black',
                        }}
                        whileHover={{
                          fill: 'red',
                        }}
                        onClick={() => {
                          setCookBookList(
                            [...cookBookList].filter((e) => e != recipe.id)
                          );
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <motion.path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
                      </CloseButton>
                    </Card>
                  );
                })}
            </CookBookCards>
          </CookBook>
        </AnimatePresence>
      </AnimateSharedLayout>
    </RecipeContainer>
  );
};

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-column-gap: 64px;
  grid-row-gap: 32px;
  justify-content: center;
`;

const RecipeContainer = styled.div`
  height: 300vh;
  display: flex;
  flex-direction: column;
`;

const CookBook = styled(motion.div)`
  background: var(--highlight-color);
  font-family: 'Montserrat', sans-serif;
  margin-top: 300px;
  padding: 30px;
  position: fixed;
  top: -300px;
  right: 0;
  width: 400px;
  height: 100vh;
  border-radius: 50px 0px 0px 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CookBookCards = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

const ToggleButton = styled(motion.button)`
  width: 12px;
  height: 500px;
  border-radius: 99999px;
  border: 0;
  padding: 0;
  font-size: 100%;
  background: #e89209;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  margin-right: 20px;
  width: 30px;
`;

const CookBookTitle = styled(motion.span)`
  color: var(--bg-color);
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  /* border: 1px solid lightgray; */
  overflow: hidden;
  background: #f4f7fc;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;
  justify-content: left;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  z-index: 2;
  margin-bottom: 10px;
`;

const CloseButton = styled(motion.svg)`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  transition: fill 0.5s ease;
`;

const FoodImage = styled(motion.img)`
  height: 80px;
  width: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 10px;
  z-index: 3;
`;

const FoodInfo = styled.div`
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
`;

const Title = styled(motion.div)`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  align-self: flex-start;
  text-align: left;
  color: var(--text-color);
`;

export default Recipes;
