import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipes } from './actions/recipeCardsAction';
import RecipeCard from './components/RecipeCard';

function App() {
  const recipeCards = useSelector((state) => state.recipeCards);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(recipeCards);
  }, []);

  return (
    <div className="App">
      <button onClick={() => dispatch(loadRecipes(3))}>TEST</button>
      <div>
        {recipeCards &&
          recipeCards.recipes.map((recipe) => {
            return <RecipeCard recipe={recipe} />;
          })}
      </div>
    </div>
  );
}

export default App;
