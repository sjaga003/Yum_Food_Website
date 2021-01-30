import axios from 'axios';
import { randomURL } from '../api';

export const loadRecipes = (numberToLoad) => async (dispatch) => {
  const randomRecipeData = await axios.get(randomURL(numberToLoad));

  dispatch({
    type: 'recipeCards/loadRecipes',
    payload: {
      recipes: randomRecipeData.data.recipes,
    },
  });
};
