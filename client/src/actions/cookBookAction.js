import {
  addRecipeToDatabase,
  deleteFromDatabase,
  fetchAllRecipes,
} from '../api/databaseApi';

export const setCookBook = (updatedValue) => {
  return {
    type: 'cookBook/setCookBook',
    payload: updatedValue,
  };
};

export const addToCookBook = (recipe) => async (dispatch) => {
  try {
    const { data } = await addRecipeToDatabase({ recipeObject: recipe });
    dispatch({
      type: 'cookBook/addToCookBook',
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCookBook = (databaseId) => async (dispatch) => {
  try {
    await deleteFromDatabase(databaseId);

    dispatch({
      type: 'cookBook/removeFromCookBook',
      payload: databaseId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchToCookBook = () => async (dispatch) => {
  try {
    const { data } = await fetchAllRecipes();

    dispatch({ type: 'cookBook/fetchAllRecipes', payload: data });
  } catch (error) {
    console.error(error);
  }
};
