const baseURL = 'https://api.spoonacular.com';

export const randomCardURL = (numberToLoad) =>
  `${baseURL}/recipes/complexSearch?number=${numberToLoad}&sort=random&apiKey=${process.env.REACT_APP_API_KEY}`; //DONT FORGET TO FIX THIS

export const recipeDetailsUrl = (id) =>
  `${baseURL}/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_API_KEY}`;

export const mockRecipeCards = () => {
  return {
    recipes: {
      results: [
        {
          id: 634727,
          title: 'Beef, Poblano & Cheese Tamales',
          image: 'https://spoonacular.com/recipeImages/634727-312x231.jpg',
          imageType: 'jpg',
        },
        {
          id: 639446,
          title: 'Cinnamon Chocolate-Chip Banana Pancakes',
          image: 'https://spoonacular.com/recipeImages/639446-312x231.jpg',
          imageType: 'jpg',
        },
        {
          id: 664785,
          title: 'Venison Sliders',
          image: 'https://spoonacular.com/recipeImages/664785-312x231.jpg',
          imageType: 'jpg',
        },
      ],
      offset: 0,
      number: 3,
      totalResults: 5077,
    },
  };
};
