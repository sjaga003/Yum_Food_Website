import {
  faStopwatch,
  faSync,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MissingImage from '../../images/card_image_missing.svg';

import { loadRecipeDetails } from '../../actions/recipeDetailsAction';
import { mockRecipeDetails } from '../../api';
import RecipeDetail from './RecipeDetail/RecipeDetail';
import { addToCookBook } from '../../actions/cookBookAction';

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
  isCookBookOpen,
  setIsCookBookOpen,
}) => {
  // const recipeDetails = mockRecipeDetails();
  const recipeDetails = useSelector((state) => state.recipeCards);
  const cookBook = useSelector((state) => state.cookBook);
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
    if (recipeCardState.isDocked) {
      dispatch(addToCookBook(recipe));
      setRecipeCardState({ ...recipeCardState, isDragging: false });
    }
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
          <TopRow>
            <SourceName>{recipe.sourceName}</SourceName>
            <div>
              <Heart icon={faHeart} /> {` ${recipe.aggregateLikes}`}
            </div>
          </TopRow>
          <Title>{recipe.title}</Title>
        </FoodInfo>
      </Card>
    </>
  );
};

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid lightgray;
  overflow: hidden;
  background: var(--card-color);
  width: 32rem;
  height: 41rem;
  justify-content: left;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  will-change: transform;
`;

const ImageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 27.6rem;
`;

const Spinner = styled(FontAwesomeIcon)`
  color: var(--secondary-color);
  display: flex;
  align-self: center;
`;

const FoodImage = styled.img`
  height: 27.6rem;
  object-fit: cover;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  color: var(--text-color);
  font-family: var(--text-font);
`;

const Heart = styled(FontAwesomeIcon)`
  color: var(--highlight-color);
`;

const FoodInfo = styled.div`
  padding: 2rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
`;

const SourceName = styled.span`
  text-transform: uppercase;
  color: var(--text-color);
`;

const Title = styled(motion.div)`
  font-family: var(--header-font);
  font-size: 1.8rem;
  color: var(--header-color);
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default RecipeCard;
