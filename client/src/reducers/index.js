import { combineReducers } from 'redux';
import recipeCardsReducer from './recipeCardsReducer';
import recipeDetailsReducer from './recipeDetailsReducer';
import cookBookReducer from './cookBookReducer';

const rootReducer = combineReducers({
  recipeCards: recipeCardsReducer,
  recipeDetails: recipeDetailsReducer,
  cookBook: cookBookReducer,
});

export default rootReducer;
