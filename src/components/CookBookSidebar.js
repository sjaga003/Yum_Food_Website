import { faBookOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import CookBookCard from './CookBookCard';

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

const CookBookSidebar = ({
  isCookBookOpen,
  setIsCookBookOpen,
  cookBookList,
  setCookBookList,
  cookBookRef,
}) => {
  return (
    <CookBookContainer
      initial={{ right: -320 }}
      animate={
        isCookBookOpen
          ? { right: -5, transition: { type: 'spring', damping: 16 } }
          : { right: -380, transition: { type: 'spring', damping: 13 } }
      }
    >
      <CookBook key="cookbook" ref={cookBookRef}>
        <ButtonContainer
          onClick={() => {
            setIsCookBookOpen(!isCookBookOpen);
          }}
        >
          <ButtonIcon icon={faBookOpen} />
        </ButtonContainer>
        {isCookBookOpen && <CookBookTitle>Cookbook</CookBookTitle>}
        <CookBookCards>
          {isCookBookOpen &&
            cookBookList &&
            cookBookList.map((entry) => {
              return (
                <CookBookCard
                  key={`cookBookCard-${entry.id}`}
                  recipe={entry}
                  setCookBookList={setCookBookList}
                  cookBookList={cookBookList}
                />
              );
            })}
        </CookBookCards>
      </CookBook>
    </CookBookContainer>
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
    background: #e89209;
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
  left: -80px;
  top: 16px;
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

const CookBookTitle = styled(motion.span)`
  color: var(--bg-color);
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const TestContainer = styled(motion.div)`
  position: absolute;
  top: 50px;
  left: -30px;
  z-index: 100;
  background: red;
  width: 5rem;
`;

const TestButton = styled.button``;

export default CookBookSidebar;
