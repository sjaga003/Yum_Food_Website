import React from 'React';
import { Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import rootReducer from '../reducers';
import Contact from '../components/MainPage/Contact';

let getByTestId;
const mockHandleSubmit = jest.fn();

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
    renderWithRouter(<Contact mockHandleSubmit={mockHandleSubmit} />),
    {}
  );
  getByTestId = component.getByTestId;
});

test('should render component', () => {
  const contact = getByTestId('contact-container');
  expect(contact).toBeInTheDocument();
});

test('should call handleSubmit when button is pressed', () => {
  const button = getByTestId('contact-submit');
  fireEvent.click(button);
  expect(mockHandleSubmit).toBeCalledTimes(1);
});

test('should clear input when button is pressed', () => {
  const button = getByTestId('contact-submit');
  const name = getByTestId('contact-name');
  const email = getByTestId('contact-email');
  const message = getByTestId('contact-message');
  fireEvent.change(name, { target: { value: 'test-name' } });
  fireEvent.change(email, { target: { value: 'test-email' } });
  fireEvent.change(message, { target: { value: 'test-message' } });
  expect(name).toHaveValue('test-name');
  expect(email).toHaveValue('test-email');
  expect(message).toHaveValue('test-message');
  fireEvent.click(button);
  expect(name).not.toHaveValue('test-name');
  expect(email).not.toHaveValue('test-email');
  expect(message).not.toHaveValue('test-message');
});
