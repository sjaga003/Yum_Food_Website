import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Recipes from './Recipes';
import {
  loadRandomRecipes,
  loadSearchedRecipes,
} from '../actions/recipeCardsAction';

const Search = ({
  isCookBookOpen,
  setIsCookBookOpen,
  cookBookList,
  setCookBookList,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(loadRandomRecipes(3))}>Test</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(searchQuery);
          dispatch(loadSearchedRecipes(5, searchQuery));
          setSearchQuery('');
        }}
      >
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </form>
      <div>{searchQuery}</div>
      <Recipes
        cookBookList={cookBookList}
        setCookBookList={setCookBookList}
        isCookBookOpen={isCookBookOpen}
        setIsCookBookOpen={setIsCookBookOpen}
      />
    </div>
  );
};

export default Search;
