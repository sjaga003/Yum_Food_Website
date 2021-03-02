import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Recipes from './Recipes';
import {
  loadAdditionalSearchedRecipes,
  loadPreviewRecipes,
  loadRandomRecipes,
  loadSearchedRecipes,
} from '../actions/recipeCardsAction';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Nav from './Nav';
import CookBookSidebar from './CookBookSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { mockRecipeCards } from '../api';
import { recipePreviewPopular } from '../recipePreviewData';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = ({
  isCookBookOpen,
  setIsCookBookOpen,
  cookBookList,
  setCookBookList,
  cookBookRef,
}) => {
  const query = useQuery();
  const [searchQuery, setSearchQuery] = useState(query.get('query'));
  const [lastSearch, setLastSearch] = useState('');
  const dispatch = useDispatch();
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const recipeCards = useSelector((state) => state.recipeCards);
  useEffect(() => {
    if (searchQuery) {
      dispatch(loadSearchedRecipes(5, searchQuery));
    }
  }, []);

  const fetchMore = () => {
    console.log('FETCH');
    dispatch(
      loadAdditionalSearchedRecipes(
        recipeCards.recipes.results.length,
        lastSearch
      )
    ); //fix this loading issue
  };

  const sortByTime = () => {
    const sorted = recipeCards.recipes.results.sort(
      (a, b) => a.readyInMinutes - b.readyInMinutes
    );
    console.log(sorted);
  };

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
        <button onClick={() => sortByTime()}>Test</button>
        <SearchTitle>Browse Hundreds of Recipes</SearchTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(searchQuery);
            // dispatch(loadSearchedRecipes(0, searchQuery));
            dispatch(loadPreviewRecipes(recipePreviewPopular()));
            setLastSearch(searchQuery);
            setSearchQuery('');
            console.log('HERE');
            console.log(!recipeCards.isDone);
          }}
        >
          <SearchContainer>
            <SearchInput
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            {searchQuery && (
              <RemoveSearchIcon
                onClick={() => setSearchQuery('')}
                icon={faTimes}
              />
            )}
          </SearchContainer>
        </form>
        <PillContainer>
          <PillBody
            onClick={() => {
              dispatch(loadSearchedRecipes(0, 'Casserole'));
            }}
          >
            <PillTitle>Casserole</PillTitle>
          </PillBody>
          <PillBody
            onClick={() => {
              dispatch(loadSearchedRecipes(0, 'Cookies'));
            }}
          >
            <PillTitle>Cookies</PillTitle>
          </PillBody>
          <PillBody
            onClick={() => {
              dispatch(loadSearchedRecipes(0, 'Cake'));
            }}
          >
            <PillTitle>Cake</PillTitle>
          </PillBody>
        </PillContainer>
      </SearchBackground>
      {recipeCards.recipes.results && (
        <InfiniteScroll
          style={{ overflow: 'unset' }}
          dataLength={parseInt(recipeCards.recipes.results.length)}
          next={fetchMore}
          hasMore={
            !recipeCards.isDone &&
            recipeCards.recipes.results.length <=
              recipeCards.recipes.totalResults
          }
          loader={<FontAwesomeIcon icon={faSync} spin />}
          endMessage={<div>That's it..</div>}
        >
          <Recipes
            cookBookList={cookBookList}
            setCookBookList={setCookBookList}
            isCookBookOpen={isCookBookOpen}
            setIsCookBookOpen={setIsCookBookOpen}
            cookBookRef={cookBookRef}
          />
        </InfiniteScroll>
      )}
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

const SearchContainer = styled.div`
  margin-bottom: 3rem;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  border: 1px solid lightgray;
  border-radius: 8px;
  background: white;
  width: 80rem;
`;

const SearchInput = styled.input`
  outline: none;
  border: 0;
  height: 8rem;
  width: 95%;
  font-size: 2.4rem;
  color: var(--secondary-color);
  font-family: var(--text-font);
  padding: 0.5rem 2rem;
`;

const RemoveSearchIcon = styled(FontAwesomeIcon)`
  color: var(--secondary-color);
  cursor: pointer;
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
  cursor: pointer;
`;

const PillTitle = styled.span`
  font-size: 1.8rem;
`;

export default Search;
