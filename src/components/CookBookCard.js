import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import MissingImage from '../images/card_image_missing.svg';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const CookBookCard = ({ recipe, cookBookList, setCookBookList }) => {
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
        onClick={() => {
          setCookBookList([...cookBookList].filter((e) => e !== recipe));
        }}
        icon={faTimes}
      />
    </Card>
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
  width: 100%;
  min-height: 100px;
  justify-content: left;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  z-index: 2;
  margin-bottom: 10px;
  &:hover {
    background: #f4f5f7;
  }
  &:hover svg {
    opacity: 1;
  }
`;

const CloseButton = styled(FontAwesomeIcon)`
  color: #aaa;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
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
  color: var(--text-color);
`;

export default CookBookCard;
