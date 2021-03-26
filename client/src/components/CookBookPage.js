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
import size from '../responsiveStyles';
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
  width: 100%;
  min-height: 100vh;
  margin: 16rem auto;
  overflow-x: hidden;

  /* background: linear-gradient(
    365deg,
    rgba(227, 139, 0, 0.29735644257703087) 0%,
    rgba(255, 255, 255, 0.2) 100%
  ); */
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    padding: 0 5vw;
  }
  @media (${size.md}) {
  }
  @media (${size.sm}) {
  }
  @media (${size.xs}) {
    margin-top: 0;
  }
`;

const Title = styled.span`
  font-size: 5.6rem;
  font-family: var(--header-font);
  color: var(--header-color);
  font-weight: 600;
  margin: 8rem 0rem 4rem 0rem;
  @media (${size.xl}) {
  }
  @media (${size.lg}) {
    font-size: 4.8rem;
  }
  @media (${size.md}) {
    font-size: 4rem;
  }
  @media (${size.sm}) {
    font-size: 3.2rem;
  }
  @media (${size.xs}) {
    font-size: 2.8rem;
    text-align: center;
  }
`;

const Error = styled.span`
  font-family: var(--text-font);
  font-size: 3.6rem;
  color: var(--text-color);
`;

export default CookBookPage;
