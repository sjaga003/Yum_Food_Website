import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Recipes from './Recipes';
import {
  loadRandomRecipes,
  loadSearchedRecipes,
} from '../actions/recipeCardsAction';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Nav from './Nav';
import CookBookSidebar from './CookBookSidebar';

const Search = ({
  isCookBookOpen,
  setIsCookBookOpen,
  cookBookList,
  setCookBookList,
  cookBookRef,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  return (
    <PageContainer>
      <Nav />
      <CookBookSidebar
        cookBookRef={cookBookRef}
        isCookBookOpen={isCookBookOpen}
        setIsCookBookOpen={setIsCookBookOpen}
        cookBookList={cookBookList}
        setCookBookList={setCookBookList}
        cookBookRef={cookBookRef}
      />
      <SearchBackground>
        {/* <button onClick={() => dispatch(loadRandomRecipes(3))}>Test</button> */}
        <SearchTitle>Browse Hundreds of Recipes</SearchTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(searchQuery);
            dispatch(loadSearchedRecipes(5, searchQuery));
            setSearchQuery('');
          }}
        >
          <SearchInput
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </form>
        <PillContainer>
          <PillBody
            onClick={() => {
              setSearchQuery('Casserole');
            }}
          >
            <PillTitle>Casserole</PillTitle>
          </PillBody>
          <PillBody
            onClick={() => {
              setSearchQuery('Cookies');
            }}
          >
            <PillTitle>Cookies</PillTitle>
          </PillBody>
          <PillBody
            onClick={() => {
              setSearchQuery('Cake');
            }}
          >
            <PillTitle>Cake</PillTitle>
          </PillBody>
        </PillContainer>
      </SearchBackground>
      <Recipes
        cookBookList={cookBookList}
        setCookBookList={setCookBookList}
        isCookBookOpen={isCookBookOpen}
        setIsCookBookOpen={setIsCookBookOpen}
        cookBookRef={cookBookRef}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SearchTitle = styled.span`
  font-size: 6.4rem;
  font-family: 'Montserrat', sans-serif;
  margin: 8rem 0rem 4rem 0rem;
`;

const SearchBackground = styled(motion.div)`
  width: 95%;
  border-radius: 17px;
  height: 54rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  outline: none;
  border: 0;
  height: 8rem;
  width: 80rem;
  font-size: 2.4rem;
  border-radius: 8px;
  color: var(--secondary-color);
  font-family: var(--text-font);
  padding: 0.5rem 2rem;
  margin-bottom: 3rem;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  border: 1px solid lightgray;
`;

const PillContainer = styled.div`
  display: flex;
  width: 80rem;
`;

const PillBody = styled.div`
  background: white;
  border-radius: 27px;
  height: 4rem;
  display: flex;
  align-items: center;
  border-left: #343c64 25px solid;
  padding: 0rem 2rem;
  margin-right: 3rem;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
`;

const PillTitle = styled.span`
  font-size: 1.8rem;
`;

export default Search;
