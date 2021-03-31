export const initialState = { recipes: [], isLoading: true, isDone: false };

export const recipeCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'recipeCards/loadRandomRecipes':
      return {
        ...state,
        recipes: action.payload.recipes,
        isLoading: false,
      };
    case 'recipeCards/loadSearchedRecipes':
      console.log(state);
      return {
        ...state,
        recipes: action.payload.recipes,
        isDone: !action.payload.recipes.results.length,
        isLoading: false,
      };
    case 'recipeCards/loadPreviewRecipes':
      return {
        ...state,
        recipes: action.payload,
        isLoading: false,
      };
    case 'recipeCards/loadAdditionalSearchedRecipes':
      console.log(state);
      return {
        ...state,
        recipes: {
          number: action.payload.recipes.number,
          offset: action.payload.recipes.offset,
          results: [
            ...state.recipes.results,
            ...action.payload.recipes.results,
          ],
          totalResults: action.payload.recipes.totalResults,
        },
        isDone: !action.payload.recipes.results.length,
      };

    case 'recipeCards/clearRecipeCards':
      return {
        ...state,
        recipes: {},
        isLoading: true,
      };
    case 'recipeCards/setRecipeCards':
      console.log(action.payload);
      return {
        ...state,
        recipes: {
          results: action.payload,
        },
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default recipeCardsReducer;
