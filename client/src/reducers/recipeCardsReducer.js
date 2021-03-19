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
    case 'recipeCards/sortRecipesByTime': {
      //Creating new scope to use sorted multiple times by using {}
      const sorted = state.recipes.results.sort(
        (a, b) => a.readyInMinutes - b.readyInMinutes
      );
      return {
        ...state,
        recipes: {
          number: state.recipes.number,
          offset: state.recipes.offset,
          results: sorted,
          totalResults: state.totalResults,
        },
      };
    }
    case 'recipeCards/sortRecipesByMeta': {
      const sorted = state.recipes.results.sort(
        (a, b) => a.healthScore - b.healthScore
      );
      return {
        ...state,
        recipes: {
          number: state.recipes.number,
          offset: state.recipes.offset,
          results: sorted,
          totalResults: state.totalResults,
        },
      };
    }
    case 'recipeCards/sortRecipesByPrice': {
      const sorted = state.recipes.results.sort(
        (a, b) => a.pricePerServing - b.pricePerServing
      );
      return {
        ...state,
        recipes: {
          number: state.recipes.number,
          offset: state.recipes.offset,
          results: sorted,
          totalResults: state.totalResults,
        },
      };
    }
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