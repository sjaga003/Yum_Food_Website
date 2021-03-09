import { faStopwatch, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MissingImage from '../../images/card_image_missing.svg';

import { loadRecipeDetails } from '../../actions/recipeDetailsAction';
import { mockRecipeDetails } from '../../api';
import RecipeDetail from './RecipeDetail/RecipeDetail';

const variant = {
  flat: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween' },
  },
  hidden: { opacity: 0, y: 100 },
};

const RecipeCard = ({
  recipe,
  cookBookRef,
  cookBookList,
  setCookBookList,
  isCookBookOpen,
  setIsCookBookOpen,
  index,
  fromPreview,
}) => {
  // const recipeDetails = mockRecipeDetails();
  const recipeDetails = useSelector((state) => state.recipeCards);
  const dispatch = useDispatch();
  const cardRef = useRef();

  const [imageLoaded, setImageLoaded] = useState(false);

  const [recipeCardState, setRecipeCardState] = useState({
    isDocked: false,
    isDragging: false,
    isDetailOpen: false,
    recipeDetail: {},
  });

  const [recipeDetail, setRecipeDetail] = useState({});

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
    const result = isWithinCookBook(cardRect, cookBookRect, 50);
    if (recipeCardState.isDocked !== result) {
      setRecipeCardState({ ...recipeCardState, isDocked: result });
    }

    if (!isCookBookOpen && result) {
      setIsCookBookOpen(true);
    }
  };

  const endDrag = (event, info) => {
    cardRef.current.style.zIndex = 0;
    const newArray = recipeCardState.isDocked
      ? [...cookBookList, recipe]
      : [...cookBookList].filter((e) => e !== recipe.id);
    setCookBookList(newArray);
    setRecipeCardState({ ...recipeCardState, isDragging: false });
  };

  const onCardClick = () => {
    if (
      cardRef.current.style.transform ===
      'translate3d(0px, 0px, 0px) scale(1, 1)'
    ) {
      setRecipeDetail(
        recipeDetails.recipes.results.find(
          (element) => element.id === recipe.id
        )
      );

      setRecipeCardState({ ...recipeCardState, isDetailOpen: true });
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    !cookBookList.includes(recipe) && (
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
          onDragStart={() => {
            setRecipeCardState({ ...recipeCardState, isDragging: true });
            cardRef.current.style.zIndex = 2;
            console.log('hello');
          }}
          onDrag={modifyDrag}
          onDragEnd={endDrag}
          layout
          layoutId={`recipeCard-${recipe.id}`}
          data-testid="recipeCard"
          data-recipe-id={recipe.id}
          variants={variant}
          initial="hidden"
          animate="flat"
          onClick={onCardClick}
        >
          <ImageContainer>
            {!imageLoaded && <Spinner size="4x" icon={faSync} spin />}
            <FoodImage
              style={!imageLoaded ? { display: 'none' } : { display: 'block' }}
              draggable={false}
              data-testid="recipeCardImage"
              src={recipe.image ? recipe.image : MissingImage}
              onLoad={() => setImageLoaded(true)}
              alt={`${recipe.title}`}
            />
          </ImageContainer>
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
  width: 26.8rem;
  height: 30rem;
  justify-content: left;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  will-change: transform;
`;

const ImageContainer = styled(motion.div)`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled(FontAwesomeIcon)`
  color: var(--secondary-color);
`;

const FoodImage = styled.img`
  height: 23.6rem;
  object-fit: cover;
`;

const FoodInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(motion.div)`
  font-family: var(--header-font);
  font-size: 1.6rem;

  text-align: center;
  color: var(--text-color);
  font-weight: 600;
`;

export default RecipeCard;
