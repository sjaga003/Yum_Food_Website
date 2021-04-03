import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchToCookBook, setCookBook } from '../actions/cookBookAction';
import NeedAuthModal from './AuthPage/NeedAuthModal';
import CookBookCard from './CookBookCard';

const CookBookSidebar = ({
  isCookBookOpen,
  setIsCookBookOpen,
  cookBookRef,
}) => {
  const cookBook = useSelector((state) => state.cookBook);
  const user = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();

  const [needAuthOpen, setNeedAuthOpen] = useState(false);

  return (
    <>
      {needAuthOpen && <NeedAuthModal setNeedAuthOpen={setNeedAuthOpen} />}
      <CookBookContainer
        initial={{ right: -380 }}
        animate={
          isCookBookOpen
            ? { right: -5, transition: { type: 'spring', damping: 16 } }
            : { right: -380, transition: { type: 'spring', damping: 13 } }
        }
      >
        <CookBook key="cookbook" ref={cookBookRef}>
          <ButtonContainer
            onClick={() => {
              if (user) {
                setIsCookBookOpen(!isCookBookOpen);
              } else {
                setNeedAuthOpen(true);
                document.body.style.overflow = 'hidden';
              }
            }}
          >
            <ButtonIcon icon={faBookOpen} />
          </ButtonContainer>
          {isCookBookOpen && (
            <CookBookTitle to="/cookbook">My Recipes</CookBookTitle>
          )}
          <CookBookCards>
            {isCookBookOpen &&
              cookBook &&
              cookBook.map((entry) => {
                return (
                  <CookBookCard
                    key={`cookBookCard-${entry.recipeObject.id}`}
                    databaseEntry={entry}
                  />
                );
              })}
          </CookBookCards>
        </CookBook>
      </CookBookContainer>
    </>
  );
};

const CookBookContainer = styled(motion.div)`
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 1;
`;

const CookBook = styled(motion.div)`
  background: var(--highlight-color);
  font-family: var(--header-font);
  padding: 3rem 1.4rem 3rem 3rem;
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

const CookBookCards = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 1rem;
    height: 0.5rem;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #da8908;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background: var(--highlight-color);
  }
  &::-webkit-resizer {
    display: none;
  }
`;

const ButtonIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 24px;
`;

const ButtonContainer = styled(motion.div)`
  position: absolute;
  align-self: flex-start;
  left: -75px;
  top: 7px;
  height: 60px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--highlight-color);
  border-radius: 30px 0px 0px 30px;
  cursor: pointer;
  &:hover svg {
    color: #f4f5f7;
  }
`;

const CookBookTitle = styled(Link)`
  color: var(--bg-color);
  font-family: var(--header-font);
  font-size: 2.8rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default CookBookSidebar;
