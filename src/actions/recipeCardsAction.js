import axios from 'axios';
import { randomCardURL } from '../api';

export const loadRecipes = (numberToLoad) => async (dispatch) => {
  const randomRecipeData = await axios.get(randomCardURL(numberToLoad));

  dispatch({
    type: 'recipeCards/loadRecipes',
    payload: {
      recipes: randomRecipeData.data,
    },
  });
};
