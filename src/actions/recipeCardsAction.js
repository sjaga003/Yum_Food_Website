import axios from 'axios';
import { randomCardURL, searchSortedURL, searchURL } from '../api';
import {
  recipePreviewDessert,
  recipePreviewPopular,
  recipePreviewVegetarian,
} from '../recipePreviewData';

export const loadRandomRecipes = (numberToLoad) => async (dispatch) => {
  const randomRecipeData = await axios.get(randomCardURL(numberToLoad));

  dispatch({
    type: 'recipeCards/loadRandomRecipes',
    payload: {
      recipes: randomRecipeData.data,
    },
  });
};

export const loadSearchedRecipes = (
  offset,
  query,
  sortType = 'meta-score'
) => async (dispatch) => {
  const searchedRecipeData = await axios.get(
    searchURL(offset, query, sortType)
  );

  dispatch({
    type: 'recipeCards/loadSearchedRecipes',
    payload: {
      recipes: searchedRecipeData.data,
    },
  });
};

export const loadAdditionalSearchedRecipes = (
  offset,
  query,
  sortType = 'meta-score'
) => async (dispatch) => {
  const searchedRecipeData = await axios.get(
    searchURL(offset, query, sortType)
  );

  dispatch({
    type: 'recipeCards/loadAdditionalSearchedRecipes',
    payload: {
      recipes: searchedRecipeData.data,
      // recipes: recipes,
    },
  });
};

export const loadPreviewRecipes = (recipes) => {
  return {
    type: 'recipeCards/loadPreviewRecipes',
    payload: recipes,
  };
};

export const sortRecipesByTime = () => {
  return {
    type: 'recipeCards/sortRecipesByTime',
  };
};

export const sortRecipesByMeta = () => {
  return {
    type: 'recipeCards/sortRecipesByMeta',
  };
};

export const sortRecipesByPrice = () => {
  return {
    type: 'recipeCards/sortRecipesByPrice',
  };
};

export const clearRecipeCards = () => {
  return {
    type: 'recipeCards/clearRecipeCards',
  };
};

export const setRecipeCards = (cardData) => {
  return {
    type: 'recipeCards/setRecipeCards',
    payload: cardData,
  };
};
