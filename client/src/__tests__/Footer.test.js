import React from 'React';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../components/MainPage/Footer';

let getByTestId;

beforeEach(() => {
  const component = render(<Footer />);
  getByTestId = component.getByTestId;
});

test('should render component', () => {
  const footer = getByTestId('footer-container');
  expect(footer).toBeInTheDocument();
});

test('should render image', () => {
  const image = getByTestId('footer-image');
  expect(image).not.toHaveAttribute('src', null);
});

test('should link to github on click', () => {
  const link = getByTestId('footer-github');
  expect(link.href).toBe('https://github.com/sjaga003');
});

test('should link to linkedin on click', () => {
  const link = getByTestId('footer-linkedin');
  expect(link.href).toBe('https://www.linkedin.com/in/suhas-jagannath/');
});
