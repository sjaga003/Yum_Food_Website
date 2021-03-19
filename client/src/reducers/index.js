import { combineReducers } from 'redux';
import recipeCardsReducer from './recipeCardsReducer';
import recipeDetailsReducer from './recipeDetailsReducer';
import authReducer from './authReducer';
import cookBookReducer from './cookBookReducer';

const rootReducer = combineReducers({
  recipeCards: recipeCardsReducer,
  recipeDetails: recipeDetailsReducer,
  cookBook: cookBookReducer,
  auth: authReducer,
});

export default rootReducer;