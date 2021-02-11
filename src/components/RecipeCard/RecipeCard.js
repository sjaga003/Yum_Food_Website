import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MissingImage from '../../images/card_image_missing.svg';

import { loadRecipeDetails } from '../../actions/recipeDetailsAction';
import { mockRecipeDetails } from '../../api';
import RecipeDetail from './RecipeDetail/RecipeDetail';

const RecipeCard = ({
  recipe,
  cookBookRef,
  cookBookList,
  setCookBookList,
  isCookBookOpen,
  setIsCookBookOpen,
}) => {
  const recipeDetails = mockRecipeDetails();
  // const recipeDetails = useSelector((state) => state.recipeDetails);
  const dispatch = useDispatch();
  const cardRef = useRef();

  const [recipeCardState, setRecipeCardState] = useState({
    isDocked: false,
    isDragging: false,
    isDetailOpen: false,
    recipeDetail: {},
  });

  const [recipeDetail, setRecipeDetail] = useState({});

  // useEffect(() => {
  //   setRecipeDetail(
  //     recipeDetails.recipes.find((element) => element.id === recipe.id)
  //   );
  // }, [recipeDetails]);

  const isWithinCookBook = (cardRect, cookBookRef, threshold) => {
    if (
      cardRect.top - threshold + cardRect.height > cookBookRef.top &&
      cardRect.left - threshold + cardRect.width > cookBookRef.left &&
      cardRect.bottom + threshold - cardRect.height < cookBookRef.bottom &&
      cardRect.right + threshold - cardRect.width < cookBookRef.right
    ) {
      return true;
    } else {
      return false;
    }
  };

  const modifyDrag = (event, info) => {
    const cardRect = cardRef.current.getBoundingClientRect();
    const cookBookRect = cookBookRef.current.getBoundingClientRect();
    const result = isWithinCookBook(cardRect, cookBookRect, 100);
    if (recipeCardState.isDocked !== result) {
      setRecipeCardState({ ...recipeCardState, isDocked: result });
    }

    if (!isCookBookOpen && result) {
      setIsCookBookOpen(true);
    }
  };

  const endDrag = (event, info) => {
    const newArray = recipeCardState.isDocked
      ? [...cookBookList, recipe.id]
      : [...cookBookList].filter((e) => e !== recipe.id);
    setCookBookList(newArray);
    setRecipeCardState({ ...recipeCardState, isDragging: false });
  };

  const onTop = { zIndex: 1 };
  const flat = {
    zIndex: 0,
    transition: { delay: 0.3 },
  };

  const onCardClick = () => {
    if (!cardRef.current.style.transform) {
      if (!recipeDetails.recipes.some((el) => el.id === recipe.id)) {
        console.log('NOT FOUND');
        dispatch(loadRecipeDetails(recipe.id));
        //useEffect updates recipeDetail when recipeDetails is updated
      } else {
        setRecipeDetail(
          recipeDetails.recipes.find((element) => element.id === recipe.id)
        );
      }

      setRecipeCardState({ ...recipeCardState, isDetailOpen: true });
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    !cookBookList.includes(recipe.id) && (
      <>
        {recipeCardState.isDetailOpen && (
          <RecipeDetail
            recipeCardState={recipeCardState.isDetailOpen}
            setRecipeCardState={setRecipeCardState}
            recipe={recipeDetail}
            recipeId={recipe.id}
          />
        )}
        <Card
          ref={cardRef}
          drag
          dragConstraints={cardRef}
          dragElastic={1}
          onDragStart={() =>
            setRecipeCardState({ ...recipeCardState, isDragging: true })
          }
          onDrag={modifyDrag}
          onDragEnd={endDrag}
          layout
          layoutId={`recipeCard-${recipe.id}`}
          data-testid="recipeCard"
          data-recipe-id={recipe.id}
          animate={recipeCardState.isDragging ? onTop : flat}
          onClick={onCardClick}
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
      </>
    )
  );
};

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid lightgray;
  overflow: hidden;
  background: #f4f7fc;
  width: 268px;
  height: 300px;
  justify-content: left;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  z-index: 3;
  cursor: pointer;
  will-change: transform;
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
  align-items: center;
`;

const Title = styled(motion.div)`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;

  text-align: center;
  color: var(--text-color);
  font-weight: 600;
`;

export default RecipeCard;
