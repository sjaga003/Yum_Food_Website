export const setCookBook = (updatedValue) => {
  return {
    type: 'cookBook/setCookBook',
    payload: updatedValue,
  };
};

export const addToCookBook = (recipe) => {
  return {
    type: 'cookBook/addToCookBook',
    payload: recipe,
  };
};

export const removeFromCookBook = (recipe) => {
  return {
    type: 'cookBook/removeFromCookBook',
    payload: recipe,
  };
};
