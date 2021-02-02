const initialState = { recipes: [], isLoading: true };

const recipeCardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'recipeCards/loadRecipes':
      // console.log(action.payload.recipes);
      return {
        ...state,
        recipes: action.payload.recipes,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default recipeCardsReducer;
