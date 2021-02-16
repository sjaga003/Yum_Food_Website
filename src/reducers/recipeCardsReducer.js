const initialState = { recipes: [], isLoading: true };

const recipeCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'recipeCards/loadRandomRecipes':
      return {
        ...state,
        recipes: action.payload.recipes,
        isLoading: false,
      };
    case 'recipeCards/loadSearchedRecipes':
      return {
        ...state,
        recipes: action.payload.recipes,
        isLoading: false,
      };
    case 'recipeCards/loadPreviewRecipes':
      return {
        ...state,
        recipes: action.payload,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default recipeCardsReducer;
