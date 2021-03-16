import { render } from '@testing-library/react';
import { mockRecipeCards } from '../../api/api';
import RecipeCard from './RecipeCard';

test('Recipe Card Renders', () => {
  const recipeCards = mockRecipeCards();
  const { queryByTestId } = render(
    <RecipeCard recipe={recipeCards.recipes[0]} />
  );
  const card = queryByTestId('recipeCard');
  expect(card).toBeTruthy();
});

test('Recipe Image Renders', () => {
  const recipeCards = mockRecipeCards();
  const { queryByTestId } = render(
    <RecipeCard recipe={recipeCards.recipes[0]} />
  );
  const image = queryByTestId('recipeCardImage');
  expect(image).not.toHaveAttribute('src', null);
});
