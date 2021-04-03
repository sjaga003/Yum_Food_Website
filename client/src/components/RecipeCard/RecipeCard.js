import {} from '@fortawesome/free-regular-svg-icons';
import {
  faHeart,
  faPlus,
  faSyncAlt,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  addToCookBook,
  removeFromCookBook,
} from '../../actions/cookBookAction';
import MissingImage from '../../images/card_image_missing.svg';
import size from '../../styles/responsiveStyles';
import NeedAuthModal from '../AuthPage/NeedAuthModal';
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
  isCookBookOpen,
  setIsCookBookOpen,
  fromCookBook,
  databaseId,
  testing,
}) => {
  const recipeDetails = useSelector((state) => state.recipeCards);
  const user = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();
  const cardRef = useRef();

  const isMobile = useSelector((state) => state.isMobile);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [needAuthOpen, setNeedAuthOpen] = useState(false);

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
    setRecipeCardState({ ...recipeCardState, isDragging: false });
    if (recipeCardState.isDocked) {
      dispatch(addToCookBook(recipe));
    } else {
      setTimeout(() => {
        cardRef.current.style.zIndex = 0;
      }, 500);
    }
  };

  const onCardClick = () => {
    if (
      cardRef.current.style.transform ===
        'translate3d(0px, 0px, 0px) scale(1, 1)' ||
      testing
    ) {
      setRecipeDetail(
        recipeDetails.recipes.results.find(
          (element) => element.id === recipe.id
        )
      );

      setRecipeCardState({ ...recipeCardState, isDetailOpen: true });
      document.body.style.overflowY = 'hidden';
    }
  };

  const handleDrag = () => {
    if (isMobile) {
      return false;
    }

    if (!fromCookBook) {
      return needAuthOpen ? false : true;
    } else {
      return false;
    }
  };

  return (
    <>
      {needAuthOpen && <NeedAuthModal setNeedAuthOpen={setNeedAuthOpen} />}
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
        drag={handleDrag()}
        dragConstraints={cardRef}
        dragElastic={user ? 1 : 0}
        onDragStart={() => {
          if (user) {
            setRecipeCardState({ ...recipeCardState, isDragging: true });
            cardRef.current.style.zIndex = 2;
          } else {
            setNeedAuthOpen(true);
            document.body.style.overflow = 'hidden';
          }
        }}
        onDrag={modifyDrag}
        onDragEnd={endDrag}
        layout
        layoutId={`recipeCard-${recipe.id}`}
        data-testid="recipe-card"
        data-recipe-id={recipe.id}
        variants={variant}
        initial="hidden"
        animate="flat"
        onClick={onCardClick}
      >
        <ImageContainer>
          {!imageLoaded && <Spinner size="4x" icon={faSyncAlt} spin />}
          {fromCookBook && (
            <DeleteContainer
              data-testid="recipe-card-cookbook-delete"
              className="deleteContainer"
              onClick={(e) => {
                e.stopPropagation();
                console.log('JELLLO');
                dispatch(removeFromCookBook(databaseId));
              }}
            >
              <FontAwesomeIcon size="lg" icon={faTimes} />
            </DeleteContainer>
          )}
          {isMobile && !fromCookBook && (
            <MobileButtonContainer
              data-testid="recipe-card-mobile-add-button"
              onClick={(e) => {
                e.stopPropagation();
                if (!user) {
                  setNeedAuthOpen(true);
                  document.body.style.overflowY = 'hidden';
                } else {
                  dispatch(addToCookBook(recipe));
                }
              }}
            >
              <FontAwesomeIcon size="lg" icon={faPlus} />
            </MobileButtonContainer>
          )}
          <FoodImage
            style={!imageLoaded ? { display: 'none' } : { display: 'block' }}
            draggable={false}
            data-testid="recipe-card-image"
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

  &:hover div > .deleteContainer {
    visibility: visible;
  }

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    div > .deleteContainer {
      visibility: visible;
    }
    width: 26rem;
    height: 33rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    width: 100%;
    height: unset;
  }
`;

const ImageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 27.6rem;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    height: 20.6rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    height: 70%;
  }
`;

const Spinner = styled(FontAwesomeIcon)`
  color: var(--secondary-color);
  display: flex;
  align-self: center;
`;

const FoodImage = styled.img`
  height: 27.6rem;
  object-fit: cover;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    height: 20.6rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    height: 100%;
    width: 100%;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  color: var(--text-color);
  font-family: var(--text-font);
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    font-size: 1.4rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    font-size: initial;
  }
`;

const Heart = styled(FontAwesomeIcon)`
  color: var(--highlight-color);
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    font-size: 1.4rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    font-size: initial;
  }
`;

const DeleteContainer = styled.div`
  position: absolute;
  right: 0;
  top: 1.5rem;
  width: 4rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--bg-color);
  background: var(--highlight-color);
  visibility: hidden;
  border-radius: 4px 0px 0px 4px;
  cursor: pointer;
  &:hover {
    background: var(--button-hover-color);
  }
`;

const MobileButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 1.5rem;
  width: 4rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--bg-color);
  background: var(--highlight-color);
  border-radius: 4px 0px 0px 4px;
  cursor: pointer;
  &:hover {
    background: var(--button-hover-color);
  }
`;

const FoodInfo = styled.div`
  padding: 2rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;

  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    padding: 1rem;
  }
`;

const SourceName = styled.span`
  text-transform: uppercase;
  color: var(--text-color);
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
  }
  @media (${size.md}) {
    font-size: 1.4rem;
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    font-size: initial;
  }
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

export default RecipeCard;
