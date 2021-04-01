import '@testing-library/jest-dom/extend-expect';
import { fireEvent, getAllByTestId, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'React';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import RecipeDetail from '../components/RecipeCard/RecipeDetail/RecipeDetail';
import { recipePreviewPopular } from '../recipePreviewData';
import rootReducer from '../reducers';

let getByTestId;

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
      <RecipeDetail recipe={recipePreviewPopular().results[0]} />
    ),
    {}
  );
  getByTestId = component.getByTestId;
});

test('should render component', () => {
  const detail = getByTestId('recipe-detail-container');
  expect(detail).toBeInTheDocument();
});

test('should render serving size input', () => {
  const serving = getByTestId('serving-size-input');
  expect(serving).toBeInTheDocument();
});

test('should start serving size input at recipe prop serving size', () => {
  const serving = getByTestId('serving-size-input');
  expect(parseInt(serving.value)).toBe(
    recipePreviewPopular().results[0].servings
  );
});

test('should increment serving size input when plus is pressed', () => {
  const serving = getByTestId('serving-size-input');
  const plus = getByTestId('serving-size-plus');
  fireEvent.click(plus);
  expect(parseInt(serving.value)).toBe(
    recipePreviewPopular().results[0].servings + 1
  );
});

test('should decrement serving size input when minus is pressed', () => {
  const serving = getByTestId('serving-size-input');
  const minus = getByTestId('serving-size-minus');
  fireEvent.click(minus);
  expect(parseInt(serving.value)).toBe(
    recipePreviewPopular().results[0].servings - 1
  );
});
