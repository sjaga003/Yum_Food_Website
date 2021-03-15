import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { setCookBook } from '../actions/cookBookAction';
import {
  loadPreviewRecipes,
  setRecipeCards,
  sortRecipesByMeta,
  sortRecipesByTime,
  sortRecipesByPrice,
  clearRecipeCards,
} from '../actions/recipeCardsAction';
import { recipePreviewPopular } from '../recipePreviewData';
import Nav from './Nav';
import Recipes from './Recipes';

const CookBookPage = ({ isCookBookOpen, setIsCookBookOpen, cookBookRef }) => {
  const dispatch = useDispatch();
  const recipeCards = useSelector((state) => state.recipeCards);
  const cookBook = useSelector((state) => state.cookBook);
  const [sortSelected, setSortSelected] = useState('');

  const location = useLocation();

  useEffect(() => {
    dispatch(clearRecipeCards());
  }, [location.pathname]);

  useEffect(() => {
    const test = recipePreviewPopular();
    dispatch(setRecipeCards(cookBook));
  }, []);

  useEffect(() => {
    if (sortSelected === 'time') {
      dispatch(sortRecipesByTime());
    } else if (sortSelected === 'meta-score') {
      dispatch(sortRecipesByMeta());
    } else if (sortSelected === 'price') {
      dispatch(sortRecipesByPrice());
    }
  }, [sortSelected]);

  return (
    <PageContainer>
      <Nav />
      <Title>My Recipes</Title>
      <button
        onClick={() => {
          dispatch(setRecipeCards(cookBook));
          dispatch(sortRecipesByMeta());
        }}
      >
        Click
      </button>
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
    </PageContainer>
  );
};

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
  font-family: 'Montserrat', sans-serif;
  margin: 8rem 0rem 4rem 0rem;
`;

export default CookBookPage;
