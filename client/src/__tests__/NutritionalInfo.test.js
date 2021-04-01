import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'React';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import NutritionalInfo from '../components/RecipeCard/RecipeDetail/NutritionalInfo';
import { recipePreviewPopular } from '../recipePreviewData';
import rootReducer from '../reducers';

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
    renderWithRouter(<NutritionalInfo recipe={mockRecipe} />),
    {}
  );
  getByTestId = component.getByTestId;
});

test('should render vitamin chart', () => {
  const chart = getByTestId('vitamin-chart');
  expect(chart).toMatchSnapshot();
});

test('should render mineral chart', () => {
  const chart = getByTestId('mineral-chart');
  expect(chart).toMatchSnapshot();
});

test('should render macros chart', () => {
  const chart = getByTestId('macros-chart');
  expect(chart).toMatchSnapshot();
});
