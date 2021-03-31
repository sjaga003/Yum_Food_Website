const intitalState = [];

const cookBookReducer = (state = intitalState, action) => {
  switch (action.type) {
    case 'cookBook/setCookBook':
      return action.payload;
    case 'cookBook/addToCookBook':
      return [...state, action.payload];
    case 'cookBook/removeFromCookBook':
      return state.filter((item) => item._id !== action.payload);
    case 'cookBook/fetchAllRecipes':
      return action.payload;
    case 'cookBook/sortRecipesByTime': {
      //Creating new scope to use sorted multiple times by using {}
      const sorted = state.sort(
        (a, b) => a.recipeObject.readyInMinutes - b.recipeObject.readyInMinutes
      );
      return [...sorted];
    }
    case 'cookBook/sortRecipesByMeta': {
      const sorted = state.sort(
        (a, b) => a.recipeObject.healthScore - b.recipeObject.healthScore
      );
      return [...sorted];
    }
    case 'cookBook/sortRecipesByPrice': {
      const sorted = state.sort(
        (a, b) =>
          a.recipeObject.pricePerServing - b.recipeObject.pricePerServing
      );
      return [...sorted];
    }
    default:
      return state;
  }
};

export default cookBookReducer;
