import axios from 'axios';

const url = 'http://localhost:5000/recipes';

export const fetchAllRecipes = () => axios.get(url);
export const addRecipeToDatabase = (newPost) => axios.post(url, newPost);
