import axios from 'axios';

const API = axios.create({ baseURL: 'https://yum-food-backend.onrender.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

export const fetchAllRecipes = () => API.get('/recipes');
export const addRecipeToDatabase = (newPost) => API.post('/recipes', newPost);
export const deleteFromDatabase = (id) => API.delete(`/recipes/${id}`);

export const signIn = (formData) => API.post('/users/signIn', formData);
export const signUp = (formData) => API.post('/users/signUp', formData);
