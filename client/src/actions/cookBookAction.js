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
    await dispatch({
      type: 'cookBook/addToCookBook',
      payload: { recipeObject: recipe },
    });
    const { data } = await addRecipeToDatabase({ recipeObject: recipe });
    dispatch({
      //Need this so that the CookBook UI shows card while its waiting for database data
      type: 'cookBook/modifyCookBookValue',
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

export const fetchToCookBook = (firstLoad) => async (dispatch) => {
  try {
    let { data } = await fetchAllRecipes();

    if (firstLoad) {
      data = data.sort(
        (a, b) => a.recipeObject.healthScore - b.recipeObject.healthScore
      );
    }

    dispatch({ type: 'cookBook/fetchAllRecipes', payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const sortRecipesByTime = () => {
  return {
    type: 'cookBook/sortRecipesByTime',
  };
};

export const sortRecipesByMeta = () => {
  return {
    type: 'cookBook/sortRecipesByMeta',
  };
};

export const sortRecipesByPrice = () => {
  return {
    type: 'cookBook/sortRecipesByPrice',
  };
};
