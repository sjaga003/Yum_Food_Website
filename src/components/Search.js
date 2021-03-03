import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Recipes from './Recipes';
import {
  loadAdditionalSearchedRecipes,
  loadPreviewRecipes,
  loadRandomRecipes,
  loadSearchedRecipes,
  sortRecipesByTime,
} from '../actions/recipeCardsAction';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Nav from './Nav';
import CookBookSidebar from './CookBookSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  const [sortSelected, setSortSelected] = useState('meta-score');
  const dispatch = useDispatch();
  const [items, setItems] = useState(Array.from({ length: 20 }));
  // const recipeCards = { recipes: [], isLoading: true, isDone: false };
  const recipeCards = useSelector((state) => state.recipeCards);
  useEffect(() => {
    if (searchQuery) {
      dispatch(loadSearchedRecipes(5, searchQuery));
    }
  }, []);
  useEffect(() => {
    console.log(sortSelected);
  }, [sortSelected]);

  const fetchMore = () => {
    console.log('FETCH');
    // setTimeout(() => {
    //   setItems(items.concat(Array.from({ length: 20 })));
    // }, 1000);
    dispatch(
      loadAdditionalSearchedRecipes(
        recipeCards.recipes.results.length,
        lastSearch,
        sortSelected
      )
    ); //fix this loading issue
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
        <SearchTitle>Browse Hundreds of Recipes</SearchTitle>
        <SearchForm
          onSubmit={(e) => {
            e.preventDefault();
            console.log(searchQuery);
            // dispatch(loadSearchedRecipes(0, searchQuery, sortSelected));

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
          <SearchButton>Search</SearchButton>
        </SearchForm>
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

      <button onClick={() => dispatch(sortRecipesByTime())}>Test</button>
      <SortSelect onChange={(e) => setSortSelected(e.target.value)}>
        <label>Sort By:</label>
        <option value="meta-score">Best</option>
        <option value="time">Time to Cook</option>
        <option value="price">Price</option>
      </SortSelect>
      {recipeCards.recipes.results ? (
        <InfiniteScroll
          scrollableTarget={'body'}
          pullDownToRefresh={false}
          style={{ overflow: 'unset' }}
          dataLength={parseInt(recipeCards.recipes.results.length)}
          next={fetchMore}
          hasMore={
            !recipeCards.isDone &&
            recipeCards.recipes.results.length <=
              recipeCards.recipes.totalResults
          }
          loader={<FontAwesomeIcon icon={faSync} spin />}
          endMessage={
            recipeCards.recipes.results.length === 0 && (
              <EndMessage>
                <FontAwesomeIcon icon={faStop} />
                <span>No more search results found...</span>
              </EndMessage>
            )
          }
        >
          <Recipes
            cookBookList={cookBookList}
            setCookBookList={setCookBookList}
            isCookBookOpen={isCookBookOpen}
            setIsCookBookOpen={setIsCookBookOpen}
            cookBookRef={cookBookRef}
            fromPreview={false}
          />
        </InfiniteScroll>
      ) : (
        lastSearch !== '' && (
          <EndMessage>
            <FontAwesomeIcon icon={faStop} />
            <span>No search results found...</span>
          </EndMessage>
        )
      )}
      {/* {items !== undefined && (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMore}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {items.map((i, index) => (
            <div key={index}>div - #{index}</div>
          ))}
        </InfiniteScroll>
      )} */}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  padding: 0 15vw;
  overflow-x: hidden;
`;

const SortSelect = styled.select`
  border: 1px solid lightgray;
  border-radius: 8px;
  background: white;
  color: var(--secondary-color);
  font-family: var(--text-font);
  align-self: flex-start;
  font-size: 1.8rem;
  padding-right: 10px;
  &:focus {
    outline: 0;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
`;

const SearchButton = styled.button`
  font-size: 2rem;
  padding: 1rem 2rem;
  background: var(--highlight-color);
  border: 0;
  height: 100%;
  color: var(--bg-color);
  font-family: var(--text-font);
  cursor: pointer;
  border-radius: 0px 8px 8px 0px;
  &:focus {
    outline: 0;
  }
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
  border: 1px solid lightgray;
  border-radius: 8px;
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background: white;
  width: 75rem;
`;

const SearchInput = styled.input`
  outline: none;
  border: 0;
  border-radius: 8px;
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
  margin-right: 45px;
`;

const PillBody = styled.div`
  background: white;
  border-radius: 8px;
  height: 4rem;
  display: flex;
  align-items: center;
  border-left: var(--highlight-color) 25px solid;
  padding: 0rem 2rem;
  margin-right: 3rem;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  cursor: pointer;
`;

const PillTitle = styled.span`
  font-size: 1.8rem;
`;

const EndMessage = styled.div`
  font-size: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--secondary-color);
  span {
    margin-left: 1rem;
  }
`;

export default Search;
