import React from 'React';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import Home from '../components/MainPage/Home';
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
  const component = renderWithRedux(renderWithRouter(<Home />), {});
  getByTestId = component.getByTestId;
});

test('should render component', () => {
  const home = getByTestId('home-container');
  expect(home).toBeInTheDocument();
});

test('should render image', () => {
  const image = getByTestId('home-image');
  expect(image).not.toHaveAttribute('src', null);
});
