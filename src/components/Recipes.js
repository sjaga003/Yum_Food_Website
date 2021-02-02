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
const Recipes = () => {
  const recipeCards = mockRecipeCards();
  // const recipeCards = useSelector((state) => state.recipeCards);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(loadRecipes(5));
    handleResize();
    window.addEventListener('resize', handleResize, true);

    return () => {
      window.removeEventListener('resize', handleResize, true);
    };
  }, []);

  const [dragData, setDragData] = useState({
    x: 0,
    y: 0,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    isDragging: false,
    lastDraggedId: null,
  });

  const [cookBookList, setCookBookList] = useState([]);

  useEffect(() => {
    // console.log(dragData);
    if (
      isWithin(
        dragData.x1,
        dragData.y1,
        dragData.x2,
        dragData.y2,
        dragData.x,
        dragData.y
      ) &&
      dragData.isDragging
    ) {
      // console.log(dragData.lastDraggedId);
      console.log('here');
      setCookBookList([
        ...cookBookList,
        recipeCards.recipes.filter(
          (card) => dragData.lastDraggedId == card.id
        )[0],
      ]);
      setDragData({
        ...dragData,
        isDragging: false,
      });
    }
  }, [dragData.x]);

  const isWithin = (x1, y1, x2, y2, x, y) => {
    return x > x1 && x < x2 && y > y1 && y < y2;
  };

  const ref = useRef();

  const handleResize = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    setDragData({
      ...dragData,
      x1: rect.x + window.pageXOffset,
      y1: rect.y + window.pageYOffset,
      x2: rect.x + window.pageXOffset + rect.width,
      y2: rect.y + window.pageYOffset + rect.height,
    });
  };

  return (
    <RecipeContainer>
      <AnimateSharedLayout type="crossfade">
        <CardContainer>
          <AnimatePresence>
            {recipeCards &&
              recipeCards.recipes.map((recipe) => {
                return (
                  <RecipeCard
                    setDragData={setDragData}
                    dragData={dragData}
                    key={recipe.title}
                    recipe={recipe}
                    cookBookList={cookBookList}
                  />
                );
              })}
          </AnimatePresence>
        </CardContainer>

        <CookBook
          ref={ref}
          on={() => {
            // console.log('HELLO');
            // console.log(dragData);
            // console.log(
            //   isWithin(
            //     dragData.x1,
            //     dragData.y1,
            //     dragData.x2,
            //     dragData.y2,
            //     dragData.x,
            //     dragData.y
            //   )
            // );
          }}
        >
          <AnimatePresence>
            DRAG HERE
            {cookBookList.map((recipe) => {
              // console.log(id);
              // const recipe = recipeCards.recipes.find((card) => id == card.id);
              // console.log(recipe);
              // const recipe = recipeCards.recipes[0];
              console.log(recipe);
              return (
                <Card
                  exit={{ opacity: 0 }}
                  key={recipe.id}
                  layoutId={recipe.id}
                  layout="position"
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={1}
                  data-recipe-id={recipe.id}
                  onDragStart={(event, info) => {
                    console.log('dragstart');

                    setDragData({
                      ...dragData,
                      lastDraggedId: event.target.offsetParent.getAttribute(
                        'data-recipe-id'
                      ),
                      isDragging: true,
                    });
                  }}
                  onDragEnd={(event, info) => {
                    console.log('hello');
                    if (
                      !isWithin(
                        dragData.x1,
                        dragData.y1,
                        dragData.x2,
                        dragData.y2,
                        info.point.x,
                        info.point.y
                      )
                    ) {
                      console.log('heyo');
                      console.log(dragData.lastDraggedId);

                      setCookBookList(
                        cookBookList.filter(
                          (recipe) => recipe.id != dragData.lastDraggedId
                        )
                      );
                      setDragData({
                        ...dragData,
                        isDragging: false,
                      });
                    }
                  }}
                >
                  <FoodImage
                    draggable={false}
                    data-testid="recipeCardImage"
                    src={recipe.image ? recipe.image : MissingImage}
                    alt={`${recipe.title}`}
                  />
                  <FoodInfo>
                    <Title>{recipe.title}</Title>
                  </FoodInfo>
                </Card>
              );
            })}
          </AnimatePresence>
        </CookBook>
      </AnimateSharedLayout>
    </RecipeContainer>
  );
};

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
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
  width: 300px;
  height: 100vh;
  border-radius: 50px 0px 0px 50px;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  /* border: 1px solid lightgray; */
  overflow: hidden;
  background: #f4f7fc;
  width: 100%;
  height: 150px;
  justify-content: left;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  z-index: 3;
  margin-bottom: 10px;
`;

const FoodImage = styled(motion.img)`
  height: 100%;
  width: 70%;
  object-fit: cover;
  position: relative;
`;

const FoodInfo = styled.div`
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled(motion.div)`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  align-self: flex-start;
  text-align: left;
  color: var(--text-color);
`;

export default Recipes;
