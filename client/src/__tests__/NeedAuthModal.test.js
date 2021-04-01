import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'React';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import NeedAuthModal from '../components/AuthPage/NeedAuthModal';
import rootReducer from '../reducers';

let getByTestId;
const history = createMemoryHistory();

const renderWithRouter = (component) => {
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
  const component = renderWithRedux(renderWithRouter(<NeedAuthModal />), {});
  getByTestId = component.getByTestId;
});

test('should render component', () => {
  const auth = getByTestId('need-auth-container');
  expect(auth).toBeInTheDocument();
});

test('should navigate to auth page onClick', () => {
  const button = getByTestId('need-auth-button');
  expect(button).toBeInTheDocument();
  history.push = jest.fn();
  fireEvent.click(button);
  expect(history.push).toHaveBeenCalledWith('/auth');
});

test('should render image', () => {
  const image = getByTestId('need-auth-image');
  expect(image).not.toHaveAttribute('src', null);
});
