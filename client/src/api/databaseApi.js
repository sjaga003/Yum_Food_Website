import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchAllRecipes = () => API.get('/recipes');
export const addRecipeToDatabase = (newPost) => API.post('/recipes', newPost);
export const deleteFromDatabase = (id) => API.delete(`/recipes/${id}`);

export const signIn = (formData) => API.post('/users/signIn', formData);
export const signUp = (formData) => API.post('/users/signUp', formData);
