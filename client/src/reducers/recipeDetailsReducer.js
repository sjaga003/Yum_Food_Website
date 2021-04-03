const initialState = { recipes: [], isLoading: true };

const recipeDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'recipeDetails/loadDetail':
      return {
        ...state,
        recipes: state.recipes.concat(action.payload.recipes),
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default recipeDetailsReducer;
