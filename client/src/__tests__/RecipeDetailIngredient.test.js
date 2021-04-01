import React from 'React';
import { Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import Home from '../components/MainPage/Home';
import rootReducer from '../reducers';
import RecipeDetailIngredient from '../components/RecipeCard/RecipeDetail/RecipeDetailIngredient';
import { recipePreviewPopular } from '../recipePreviewData';

let getByTestId;
const mockRecipe = recipePreviewPopular().results[0];
const mockIngredientList = [
  { id: 10011135, image: 'cauliflower.jpg', name: 'cauliflower florets' },
  { id: 10111135, image: 'cauliflower.jpg', name: 'cauliflower rice' },
  { id: 11135, image: 'cauliflower.jpg', name: 'cauliflower' },
  { id: 20028, image: 'couscous-cooked.jpg', name: 'couscous' },
  { id: 20444, image: 'uncooked-white-rice.png', name: 'rice' },
  { id: 1001, image: 'butter-sliced.jpg', name: 'butter' },
  { id: 4582, image: 'vegetable-oil.jpg', name: 'cooking oil' },
  { id: 11291, image: 'spring-onions.jpg', name: 'green onions' },
  { id: 11215, image: 'garlic.png', name: 'garlic' },
  { id: 4047, image: 'oil-coconut.jpg', name: 'coconut oil' },
  { id: 11090, image: 'broccoli.jpg', name: 'broccoli' },
  { id: 11304, image: 'peas.jpg', name: 'peas' },
  { id: 4058, image: 'sesame-oil.png', name: 'sesame oil' },
  { id: 16124, image: 'soy-sauce.jpg', name: 'soy sauce' },
  { id: 12023, image: 'sesame-seeds.png', name: 'sesame seeds' },
  { id: 5006, image: 'whole-chicken.jpg', name: 'whole chicken' },
  { id: 18070, image: 'toast', name: 'toast' },
];

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
      <RecipeDetailIngredient
        item={mockRecipe.nutrition.ingredients[0]}
        ingredientsList={mockIngredientList}
        defaultServing={mockRecipe.servings}
        serving={mockRecipe.servings}
      />
    ),
    {}
  );
  getByTestId = component.getByTestId;
});

test('should render component', () => {
  const ingredient = getByTestId('ingredient-container');
  expect(ingredient).toBeInTheDocument();
});

test('should render ingredient image', () => {
  const image = getByTestId('ingredient-image');
  expect(image).not.toHaveAttribute('src', null);
});

test('should render name based on passed in input', () => {
  const name = getByTestId('ingredient-name');
  expect(name.textContent).toBe(mockRecipe.nutrition.ingredients[0].name);
});

test('should render ingredient amount baesd on passed in input', () => {
  const amount = getByTestId('ingredient-amount');
  expect(amount).toHaveTextContent(
    `${mockRecipe.nutrition.ingredients[0].amount} ${mockRecipe.nutrition.ingredients[0].unit}`
  );
});

test('should render ingredient amount with a different serving size', () => {
  cleanup();
  const component = renderWithRedux(
    renderWithRouter(
      <RecipeDetailIngredient
        item={mockRecipe.nutrition.ingredients[0]}
        ingredientsList={mockIngredientList}
        defaultServing={mockRecipe.servings}
        serving={mockRecipe.servings * 2}
      />
    ),
    {}
  );
  const amount = component.getByTestId('ingredient-amount');
  expect(amount).toHaveTextContent(
    `${mockRecipe.nutrition.ingredients[0].amount * 2} ${
      mockRecipe.nutrition.ingredients[0].unit
    }`
  );
});
