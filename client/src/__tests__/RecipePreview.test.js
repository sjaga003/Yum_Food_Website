import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import RecipePreview from '../components/MainPage/RecipePreview/RecipePreview';
import rootReducer from '../reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  recipePreviewAppetizer,
  recipePreviewPopular,
} from '../recipePreviewData';

let getByTestId;
let getByName;
let mockStore;

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
  const component = renderWithRedux(<RecipePreview />, {});
  mockStore = component.store;
  getByTestId = component.getByTestId;
  getByName = component.getByText;
});

test('should render component', () => {
  const preview = getByTestId('recipe-preview-container');

  expect(preview).toBeInTheDocument();
});

test('should set recipeCards redux state to previewRecipes by default', () => {
  for (
    let i = 0;
    i < mockStore.getState().recipeCards.recipes.results.length;
    i++
  ) {
    expect(
      Object.entries(
        mockStore.getState().recipeCards.recipes.results[i]
      ).toString()
    ).toBe(Object.entries(recipePreviewPopular().results[i]).toString());
  }
});

test('should set recipeCards redux state to recipePreviewAppetizer on button click', () => {
  const button = getByName('Appetizer');
  fireEvent.click(button);
  for (
    let i = 0;
    i < mockStore.getState().recipeCards.recipes.results.length;
    i++
  ) {
    expect(
      Object.entries(
        mockStore.getState().recipeCards.recipes.results[i]
      ).toString()
    ).toBe(Object.entries(recipePreviewAppetizer().results[i]).toString());
  }
});
