import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import MissingImage from '../../images/card_image_missing.svg';

const RecipeCard = ({ recipe, dragData, setDragData, cookBookList }) => {
  if (!recipe.image) {
    // console.log(recipe);
  }
  const [testState, setTestState] = useState(false);

  const CardRef = useRef();
  const test = (info) => {
    setDragData({
      ...dragData,
      x: info.point.x,
      y: info.point.y,
    });
  };

  return (
    <Card
      // animate={
      //   cookBookList.filter(
      //     (recipe) =>
      //       CardRef.current.getAttribute('data-recipe-id') == recipe.id
      //   ).length != 0
      //     ? { opacity: 0 }
      //     : { opacity: 1 }
      // }
      inital={{ scale: 0 }}
      animate={{ scale: 1 }}
      ref={CardRef}
      layoutId={recipe.id}
      layout="position"
      drag
      dragConstraints={false}
      // dragConstraints={CardRef}
      // dragElastic={1}
      data-testid="recipeCard"
      onDragStart={(event, info) => {
        // console.log();
        setDragData({
          ...dragData,
          lastDraggedId: event.target.offsetParent.getAttribute(
            'data-recipe-id'
          ),
          isDragging: true,
        });
      }}
      onDragEnd={(event, info) => {
        // console.log(info.point.y);
        // console.log(info);
        // console.log(event);
        test(info);
        console.log('start');
        // setTestState(!testState);
        // console.log(testState);
        // console.log('notfalse');
        // console.log(dragData);
      }}
      data-recipe-id={recipe.id}
    >
      <FoodImage
        layout
        draggable={false}
        data-testid="recipeCardImage"
        src={recipe.image ? recipe.image : MissingImage}
        alt={`${recipe.title}`}
      />
      <FoodInfo>
        <Title>{recipe.title}</Title>
        <BottomRow>
          <SourceName>{recipe.sourceName}</SourceName>
          <CookTime>
            <FontAwesomeIcon icon={faStopwatch} /> {recipe.readyInMinutes}
          </CookTime>
        </BottomRow>
      </FoodInfo>
    </Card>
  );
};

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  /* border: 1px solid lightgray; */
  overflow: hidden;
  background: #f4f7fc;
  width: 268px;
  height: 343px;
  justify-content: left;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  z-index: 3;
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
`;

const Title = styled(motion.div)`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  align-self: flex-start;
  text-align: left;
  color: var(--text-color);
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SourceName = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  align-self: flex-start;
  text-align: left;
  font-style: italic;
  color: #696969;
`;

const CookTime = styled.div`
  font-weight: 600;
`;

export default RecipeCard;
