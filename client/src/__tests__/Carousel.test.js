import React from 'React';
import { Router } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import Carousel from '../components/MainPage/Carousel';

let getByTestId;
let debug;
const history = createMemoryHistory();

const renderWithRouter = (component) => {
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

beforeEach(() => {
  const component = renderWithRouter(<Carousel />);
  getByTestId = component.getByTestId;
  debug = component.debug;
});

test('should render component', () => {
  const carousel = getByTestId('carousel-container');
  expect(carousel).toBeInTheDocument();
});

test('should have initial highlighted card be burgers', () => {
  const burgers = getByTestId('carousel-card-Burgers');
  expect(burgers).toHaveStyle('opacity: 1; transform: none;');
});

test('should have highlighted card be pizza when left button is pressed', async () => {
  const burgers = getByTestId('carousel-card-Burgers');
  const pizza = getByTestId('carousel-card-Pizza');
  const leftButton = getByTestId('carousel-left');
  expect(burgers).toHaveStyle('opacity: 1; transform: none;');
  expect(pizza).toHaveStyle(
    'opacity: 0.4; transform: scale(0.7) translateZ(0);'
  );
  fireEvent.click(leftButton);
  await new Promise((r) => setTimeout(() => r(), 1000)); //waits until useEffect has been processed
  expect(burgers).toHaveStyle(
    'opacity: 0.4; transform: scale(0.7) translateZ(0);'
  );
  expect(pizza).toHaveStyle('opacity: 1; transform: none;');
});

test('should have highlighted card be tacos when right button is pressed', async () => {
  const burgers = getByTestId('carousel-card-Burgers');
  const tacos = getByTestId('carousel-card-Tacos');
  const rightButton = getByTestId('carousel-right');
  expect(burgers).toHaveStyle('opacity: 1; transform: none;');
  expect(tacos).toHaveStyle(
    'opacity: 0.4; transform: scale(0.7) translateZ(0);'
  );

  fireEvent.click(rightButton);
  await new Promise((r) => setTimeout(() => r(), 500)); //waits until useEffect has been processed
  expect(burgers).toHaveStyle(
    'opacity: 0.4; transform: scale(0.7) translateZ(0);'
  );
  expect(tacos).toHaveStyle('opacity: 1; transform: none;');
});

test('should have highlighted card wrap around carousel when clicked right through all cards', async () => {
  const fries = getByTestId('carousel-card-Fries');
  const chicken = getByTestId('carousel-card-Chicken');
  const rightButton = getByTestId('carousel-right');
  fireEvent.click(rightButton);
  fireEvent.click(rightButton);
  fireEvent.click(rightButton);
  fireEvent.click(rightButton);
  await new Promise((r) => setTimeout(() => r(), 500)); //waits until useEffect has been processed
  expect(chicken).toHaveStyle('opacity: 1; transform: none;');
  expect(fries).toHaveStyle(
    'opacity: 0.4; transform: scale(0.7) translateZ(0);'
  );
  fireEvent.click(rightButton);
  await new Promise((r) => setTimeout(() => r(), 500)); //waits until useEffect has been processed
  expect(chicken).toHaveStyle(
    'opacity: 0.4; transform: scale(0.7) translateZ(0);'
  );
  expect(fries).toHaveStyle('opacity: 1; transform: none;');
});

test('should have highlighted card wrap around carousel when clicked left through all cards', async () => {
  const fries = getByTestId('carousel-card-Fries');
  const chicken = getByTestId('carousel-card-Chicken');
  const leftButton = getByTestId('carousel-left');
  fireEvent.click(leftButton);
  fireEvent.click(leftButton);
  await new Promise((r) => setTimeout(() => r(), 500)); //waits until useEffect has been processed
  expect(chicken).toHaveStyle(
    'opacity: 0.4; transform: scale(0.7) translateZ(0);'
  );
  expect(fries).toHaveStyle('opacity: 1; transform: none;');
  fireEvent.click(leftButton);
  await new Promise((r) => setTimeout(() => r(), 500)); //waits until useEffect has been processed
  expect(chicken).toHaveStyle('opacity: 1; transform: none;');
  expect(fries).toHaveStyle(
    'opacity: 0.4; transform: scale(0.7) translateZ(0);'
  );
});

test('should navigate to appropriate page on card click', async () => {
  const link = getByTestId('carousel-link-Burgers');
  history.push = jest.fn();
  fireEvent.click(link);
  expect(history.push).toHaveBeenCalledWith('/search?query=Burgers');
});
