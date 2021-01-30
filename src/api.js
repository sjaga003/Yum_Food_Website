const baseURL = 'https://api.spoonacular.com';

export const randomURL = (numberToLoad) =>
  `${baseURL}/recipes/random?number=${numberToLoad}&apiKey=${process.env.REACT_APP_API_KEY}`; //DONT FORGET TO FIX THIS
