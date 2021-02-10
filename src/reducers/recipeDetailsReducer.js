const initialState = { recipes: [], isLoading: true };

const recipeDetailsReducer = (state = initialState, action) => {
  console.log(action.payload);
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
