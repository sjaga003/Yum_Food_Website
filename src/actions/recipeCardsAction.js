import axios from 'axios';
import { randomCardURL, searchURL } from '../api';

export const loadRandomRecipes = (numberToLoad) => async (dispatch) => {
  const randomRecipeData = await axios.get(randomCardURL(numberToLoad));

  dispatch({
    type: 'recipeCards/loadRandomRecipes',
    payload: {
      recipes: randomRecipeData.data,
    },
  });
};

export const loadSearchedRecipes = (offset, query) => async (dispatch) => {
  const searchedRecipeData = await axios.get(searchURL(offset, query));

  dispatch({
    type: 'recipeCards/loadSearchedRecipes',
    payload: {
      recipes: searchedRecipeData.data,
    },
  });
};

export const loadAdditionalSearchedRecipes = (offset, query) => async (
  dispatch
) => {
  const searchedRecipeData = await axios.get(searchURL(offset, query));

  dispatch({
    type: 'recipeCards/loadAdditionalSearchedRecipes',
    payload: {
      recipes: searchedRecipeData.data,
    },
  });
};

export const loadPreviewRecipes = (recipes) => {
  return {
    type: 'recipeCards/loadPreviewRecipes',
    payload: recipes,
  };
};
