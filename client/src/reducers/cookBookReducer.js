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
    default:
      return state;
  }
};

export default cookBookReducer;
