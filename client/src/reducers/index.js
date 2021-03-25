import { combineReducers } from 'redux';
import recipeCardsReducer from './recipeCardsReducer';
import recipeDetailsReducer from './recipeDetailsReducer';
import authReducer from './authReducer';
import cookBookReducer from './cookBookReducer';
import isMobileReducer from './isMobileReducer';

const rootReducer = combineReducers({
  recipeCards: recipeCardsReducer,
  recipeDetails: recipeDetailsReducer,
  cookBook: cookBookReducer,
  auth: authReducer,
  isMobile: isMobileReducer,
});

export default rootReducer;
