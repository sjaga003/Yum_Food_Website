import { combineReducers } from 'redux';
import recipeCardsReducer from './recipeCardsReducer';

const rootReducer = combineReducers({
  recipeCards: recipeCardsReducer,
});

export default rootReducer;
