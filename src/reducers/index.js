import { combineReducers } from 'redux';
import recipeCardsReducer from './recipeCardsReducer';
import recipeDetailsReducer from './recipeDetailsReducer';

const rootReducer = combineReducers({
  recipeCards: recipeCardsReducer,
  recipeDetails: recipeDetailsReducer,
});

export default rootReducer;
