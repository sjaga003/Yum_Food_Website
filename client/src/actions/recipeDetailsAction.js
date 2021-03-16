import axios from 'axios';
import { recipeDetailsUrl } from '../api/api';

export const loadRecipeDetails = (recipeId) => async (dispatch) => {
  const recipeDetail = await axios.get(recipeDetailsUrl(recipeId));
  dispatch({
    type: 'recipeDetails/loadDetail',
    payload: {
      recipes: recipeDetail.data,
    },
  });
};
