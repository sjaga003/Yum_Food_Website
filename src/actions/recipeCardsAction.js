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

export const loadSearchedRecipes = (numberToLoad, query) => async (
  dispatch
) => {
  const searchedRecipeData = await axios.get(searchURL(numberToLoad, query));

  dispatch({
    type: 'recipeCards/loadSearchedRecipes',
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
