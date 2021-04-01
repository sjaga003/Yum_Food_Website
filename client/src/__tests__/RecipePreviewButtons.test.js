import { fireEvent, render } from '@testing-library/react';
import React, { useState } from 'react';
import { createStore } from 'redux';
import RecipePreviewButton from '../components/MainPage/RecipePreview/RecipePreviewButton';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import rootReducer from '../reducers';

let getByTestId;
const mockRecipes = jest.fn();
let mockActiveButton = 'Popular';
const mockSetActiveButton = (name) => (mockActiveButton = name);

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
    <RecipePreviewButton
      name="test-name"
      recipes={mockRecipes()}
      activeButton={mockActiveButton}
      setActiveButton={mockSetActiveButton}
    />
  );
  getByTestId = component.getByTestId;
});

test('should render component', () => {
  const button = getByTestId('recipe-preview-button');
  expect(button).toBeInTheDocument();
});

test('should display name passed by props', () => {
  const button = getByTestId('recipe-preview-button');
  expect(button.textContent).toBe('test-name');
});

test('should call function to change active button once', () => {
  const button = getByTestId('recipe-preview-button');
  fireEvent.click(button);
  expect(mockRecipes).toHaveBeenCalled();
  expect(mockRecipes).toHaveBeenCalledTimes(1);
});

test('should set css to active on press', () => {
  const button = getByTestId('recipe-preview-button');
  fireEvent.click(button);
  expect(button).toHaveStyle('background: var(--highlight-color)');
});
