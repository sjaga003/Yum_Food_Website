import { faStop, faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import {
  clearRecipeCards,
  loadAdditionalSearchedRecipes,
  loadSearchedRecipes,
} from '../actions/recipeCardsAction';
import CookBookSidebar from './CookBookSidebar';
import Nav from './Nav';
import Recipes from './Recipes';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = ({ isCookBookOpen, setIsCookBookOpen, cookBookRef }) => {
  const query = useQuery();
  const [searchQuery, setSearchQuery] = useState(query.get('query') || '');
  const [lastSearch, setLastSearch] = useState('');
  const [sortSelected, setSortSelected] = useState('meta-score');
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    dispatch(clearRecipeCards());
  }, [location.pathname]);

  const recipeCards = useSelector((state) => state.recipeCards);
  useEffect(() => {
    if (searchQuery) {
      dispatch(loadSearchedRecipes(0, searchQuery, sortSelected));
      // dispatch(loadPreviewRecipes(recipePreviewPopular()));
      setLastSearch(searchQuery);
      setSearchQuery('');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMore = () => {
    dispatch(
      loadAdditionalSearchedRecipes(
        recipeCards.recipes.results.length,
        lastSearch,
        sortSelected
      )
    );
  };

  let bool = false;
  setTimeout(() => {
    bool = true;
  }, 1000);

  return (
    <PageContainer>
      <Nav />
      <CookBookSidebar
        cookBookRef={cookBookRef}
        isCookBookOpen={isCookBookOpen}
        setIsCookBookOpen={setIsCookBookOpen}
      />
      <SearchBackground>
        <SearchTitle>Browse Hundreds of Recipes</SearchTitle>
        <SearchForm
          onSubmit={(e) => {
            e.preventDefault();
            console.log(searchQuery);
            dispatch(loadSearchedRecipes(0, searchQuery, sortSelected));

            // dispatch(loadPreviewRecipes(recipePreviewPopular()));
            setLastSearch(searchQuery);
            history.push({
              pathname: '/search',
              search: `?query=${searchQuery}`,
              state: {
                update: true,
              },
            });
            setSearchQuery('');

            console.log('HERE');
            console.log(!recipeCards.isDone);
          }}
        >
          <SearchContainer>
            <SearchInput
              onChange={(e) => setSearchQuery(e.target.value)}
              value={'' || searchQuery}
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
              dispatch(loadSearchedRecipes(0, 'Casserole', sortSelected));
              setLastSearch('Casserole');
              history.push({
                pathname: '/search',
                search: `?query=Casserole`,
                state: {
                  update: true,
                },
              });
            }}
          >
            <PillTitle>Casserole</PillTitle>
          </PillBody>
          <PillBody
            onClick={() => {
              dispatch(loadSearchedRecipes(0, 'Cookies', sortSelected));
              setLastSearch('Cookies');
              history.push({
                pathname: '/search',
                search: `?query=Cookies`,
                state: {
                  update: true,
                },
              });
            }}
          >
            <PillTitle>Cookies</PillTitle>
          </PillBody>
          <PillBody
            onClick={() => {
              dispatch(loadSearchedRecipes(0, 'Cake', sortSelected));
              setLastSearch('Cake');
              history.push({
                pathname: '/search',
                search: `?query=Cake`,
                state: {
                  update: true,
                },
              });
            }}
          >
            <PillTitle>Cake</PillTitle>
          </PillBody>
        </PillContainer>
      </SearchBackground>

      {lastSearch && (
        <SortSelect
          onChange={(e) => {
            setSortSelected(e.target.value);
            if (
              recipeCards.recipes.results &&
              recipeCards.recipes.results.length
            ) {
              console.log('reset');
              dispatch(clearRecipeCards());
              dispatch(loadSearchedRecipes(0, lastSearch, e.target.value));
            }
          }}
        >
          <option value="meta-score">Best</option>
          <option value="time">Time to Cook</option>
          <option value="price">Price</option>
        </SortSelect>
      )}
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
          loader={
            <Loader>
              <FontAwesomeIcon icon={faSync} spin />
            </Loader>
          }
          endMessage={
            <EndMessage>
              <FontAwesomeIcon icon={faStop} />
              <motion.span>No more search results found...</motion.span>
            </EndMessage>
          }
        >
          <Recipes
            isCookBookOpen={isCookBookOpen}
            setIsCookBookOpen={setIsCookBookOpen}
            cookBookRef={cookBookRef}
            fromPreview={false}
          />
        </InfiniteScroll>
      ) : (
        lastSearch !== '' &&
        (bool ? (
          <EndMessage
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { duration: 2, type: 'tween' },
            }}
          >
            <FontAwesomeIcon icon={faStop} />
            <span>No search results found</span>
          </EndMessage>
        ) : (
          <Loader>
            <FontAwesomeIcon icon={faSync} spin />
          </Loader>
        ))
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
  color: var(--text-color);
  font-family: var(--text-font);
  align-self: flex-start;
  font-size: 1.8rem;
  padding: 0.5rem;
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

const Loader = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10rem;
  font-size: 1.8em;
  color: var(--header-color);
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
  transition: background 0.2s;
  &:hover {
    background: var(--button-hover-color);
  }
`;

const SearchTitle = styled.span`
  font-size: 6.4rem;
  font-family: var(--header-font);
  font-weight: 600;
  color: var(--header-color);
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
  color: var(--header-color);
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  transition: border-left 0.2s;
  &:hover {
    border-left: var(--button-hover-color) 25px solid;
  }
`;

const PillTitle = styled.span`
  font-size: 1.8rem;
`;

const EndMessage = styled(motion.div)`
  font-size: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--header-color);
  span {
    margin-left: 1rem;
  }
`;

export default Search;
