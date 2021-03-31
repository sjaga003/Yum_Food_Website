import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'React';
import Welcome from '../components/MainPage/Welcome.js';

let getByTestId;

beforeEach(() => {
  const component = render(<Welcome />);
  getByTestId = component.getByTestId;
});

test('should render component', () => {
  const home = getByTestId('welcome-container');
  expect(home).toBeInTheDocument();
});

test('should render image', () => {
  const image = getByTestId('welcome-image');
  expect(image).not.toHaveAttribute('src', null);
});

test('should link to spoonacular on click', () => {
  const link = getByTestId('welcome-link');
  expect(link.href).toBe('https://spoonacular.com/');
});
