import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { recipePreviewPopular } from '../recipePreviewData';
import rootReducer from '../reducers';

let getByTestId;
let getByText;
let debug;
let mockStore;

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunk))
    ),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

beforeEach(() => {
  const component = renderWithRedux(
    <RecipeCard testing recipe={recipePreviewPopular().results[0]} />,
    {
      initialState: {
        recipeCards: {
          recipes: { results: [...recipePreviewPopular().results] },
        },
      },
    }
  );
  debug = component.debug;
  mockStore = component.store;
  getByTestId = component.getByTestId;
  getByText = component.getByText;
});

test('should render component', () => {
  const card = getByTestId('recipe-card');

  expect(card).toBeInTheDocument();
});

test('should render image as not null', () => {
  const image = getByTestId('recipe-card-image');
  expect(image).not.toHaveAttribute('src', null);
});

test('should display recipe detail onClick', () => {
  const card = getByTestId('recipe-card');
  fireEvent.click(card);
  expect(getByTestId('recipe-detail-container')).toBeInTheDocument();
});

test('should render add card button in mobile', () => {
  cleanup();
  const component = renderWithRedux(
    <RecipeCard testing recipe={recipePreviewPopular().results[0]} />,
    {
      initialState: {
        recipeCards: {
          recipes: { results: [...recipePreviewPopular().results] },
        },
        isMobile: true,
      },
    }
  );
  const button = component.getByTestId('recipe-card-mobile-add-button');
  expect(button).toBeInTheDocument();
});

test('should render delete button if in fromCookBook', () => {
  cleanup();
  const component = renderWithRedux(
    <RecipeCard
      testing
      recipe={recipePreviewPopular().results[0]}
      fromCookBook
    />,
    {
      initialState: {
        recipeCards: {
          recipes: { results: [...recipePreviewPopular().results] },
        },
      },
    }
  );
  const deleteButton = component.getByTestId('recipe-card-cookbook-delete');
  expect(deleteButton).toBeInTheDocument();
});
