import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Recipes from './Recipes';
import { loadSearchedRecipes } from '../actions/recipeCardsAction';

const Search = () => {
  const [isCookBookOpen, setIsCookBookOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  return (
    <div>
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
        isCookBookOpen={isCookBookOpen}
        setIsCookBookOpen={setIsCookBookOpen}
      />
    </div>
  );
};

export default Search;
