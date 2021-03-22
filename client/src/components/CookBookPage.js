import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { fetchToCookBook } from '../actions/cookBookAction';
import {
  clearRecipeCards,
  setRecipeCards,
  sortRecipesByMeta,
  sortRecipesByPrice,
  sortRecipesByTime,
} from '../actions/recipeCardsAction';
import NeedAuthModal from './Auth/NeedAuthModal';
import Nav from './Nav';
import Recipes from './Recipes';

const CookBookPage = ({ isCookBookOpen, setIsCookBookOpen, cookBookRef }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const cookBook = useSelector((state) => state.cookBook);
  const [sortSelected, setSortSelected] = useState('meta-score');
  const [needAuthOpen, setNeedAuthOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(clearRecipeCards());
  }, [location.pathname, dispatch]);

  useEffect(() => {
    const recipeObjects = cookBook.reduce((acc, curr) => {
      acc.push(curr.recipeObject);
      return acc;
    }, []);

    console.log(recipeObjects);
    dispatch(setRecipeCards(recipeObjects));
  }, [cookBook, dispatch]);

  useEffect(() => {
    if (user) {
      setNeedAuthOpen(false);
      if (!cookBook.length) {
        dispatch(fetchToCookBook());
      }
    } else {
      setNeedAuthOpen(true);
    }
  }, [user, dispatch, cookBook.length]);

  useEffect(() => {
    if (sortSelected === 'time') {
      dispatch(sortRecipesByTime());
    } else if (sortSelected === 'meta-score') {
      dispatch(sortRecipesByMeta());
    } else if (sortSelected === 'price') {
      dispatch(sortRecipesByPrice());
    }
  }, [sortSelected, dispatch]);

  return (
    <PageContainer>
      {needAuthOpen && (
        <NeedAuthModal cantClose={true} setNeedAuthOpen={setNeedAuthOpen} />
      )}
      <Nav />
      <Title>My Recipes</Title>
      {cookBook ? (
        <>
          <SortSelect
            onChange={(e) => {
              setSortSelected(e.target.value);
            }}
          >
            <label>Sort By:</label>
            <option value="meta-score">Best</option>
            <option value="time">Time to Cook</option>
            <option value="price">Price</option>
          </SortSelect>
          <Recipes
            isCookBookOpen={isCookBookOpen}
            setIsCookBookOpen={setIsCookBookOpen}
            cookBookRef={cookBookRef}
            fromCookBook={true}
          />
        </>
      ) : (
        <Error>No Recipes Saved...</Error>
      )}
    </PageContainer>
  );
};

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

const Title = styled.span`
  font-size: 6.4rem;
  font-family: var(--header-font);
  color: var(--header-color);
  font-weight: 600;
  margin: 8rem 0rem 4rem 0rem;
`;

const Error = styled.span`
  font-family: var(--text-font);
  font-size: 3.6rem;
  color: var(--text-color);
`;

export default CookBookPage;
