import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeFromCookBook } from '../actions/cookBookAction';
import MissingImage from '../images/card_image_missing.svg';
import RecipeDetail from './RecipeCard/RecipeDetail/RecipeDetail';
const CookBookCard = ({ databaseEntry }) => {
  const [recipeCardState, setRecipeCardState] = useState({
    isDocked: false,
    isDragging: false,
    isDetailOpen: false,
    recipeDetail: {},
  });

  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    //Added deps to remove ESLint Warning
    //Only supposed to run once on first render []
    setRecipe(databaseEntry.recipeObject);
  }, [databaseEntry.recipeObject]);

  const cardRef = useRef();

  const dispatch = useDispatch();

  const [recipeDetail, setRecipeDetail] = useState({});

  const onCardClick = () => {
    setRecipeDetail(recipe);

    setRecipeCardState({ ...recipeCardState, isDetailOpen: true });
    document.body.style.overflow = 'hidden';
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
        key={`cookBookList-${recipe.id}`}
        layout
        layoutId={`recipeCard-${recipe.id}`}
        ref={cardRef}
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
        </FoodInfo>{' '}
        <CloseContainer
          onClick={(e) => {
            dispatch(removeFromCookBook(databaseEntry._id));
            e.stopPropagation();
          }}
        >
          <CloseButton icon={faTimes} />
        </CloseContainer>
      </Card>
    </>
  );
};

const Card = styled(motion.div)`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  justify-content: center;
  align-items: center;
  width: 92%;
  min-height: 100px;
  justify-content: left;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  z-index: 2;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background: #f4f5f7;
  }
  &:hover svg {
    opacity: 1;
  }
`;

const CloseContainer = styled.div`
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled(FontAwesomeIcon)`
  color: #aaa;

  transition: fill 0.5s ease;
  opacity: 0;
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

  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`;

const Title = styled(motion.span)`
  font-family: var(--header-font);
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  color: var(--header-color);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default CookBookCard;
