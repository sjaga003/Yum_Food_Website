import React from 'React';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import Home from '../components/MainPage/Home';
import rootReducer from '../reducers';
import RecipeDetailInstruction from '../components/RecipeCard/RecipeDetail/RecipeDetailInstruction';
import { mockRecipeCards } from '../api/api';
import { recipePreviewPopular } from '../recipePreviewData';

let getByTestId;
const mockRecipe = recipePreviewPopular().results[0];

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return <Router history={history}>{component}</Router>;
};

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

beforeEach(() => {
  const component = renderWithRedux(
    renderWithRouter(
      <RecipeDetailInstruction
        instruction={mockRecipe.analyzedInstructions[0].steps[0]}
      />
    ),
    {}
  );
  getByTestId = component.getByTestId;
});

test('should render component', () => {
  const instruction = getByTestId('instruction-container');
  expect(instruction).toBeInTheDocument();
});

test('should render ingredient number based on passed in info', () => {
  const number = getByTestId('instruction-number');
  expect(number).toHaveTextContent(
    `#${mockRecipe.analyzedInstructions[0].steps[0].number}`
  );
});

test('should render ingredient text based on passed in info', () => {
  const text = getByTestId('instruction-text');
  expect(text).toHaveTextContent(
    mockRecipe.analyzedInstructions[0].steps[0].step
  );
});
