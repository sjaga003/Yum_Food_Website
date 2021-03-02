const initialState = { recipes: [], isLoading: true, isDone: false };

const recipeCardsReducer = (state = initialState, action) => {
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
    default:
      return { ...state };
  }
};

export default recipeCardsReducer;
