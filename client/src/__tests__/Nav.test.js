import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'React';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import Nav from '../components/Nav';
import rootReducer from '../reducers';

let getByTestId;
const mockSetIsCookBookOpen = jest.fn();
let mockIsCookBookOpen = false;
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
  const component = renderWithRedux(
    renderWithRouter(
      <Nav
        isCookBookOpen={mockIsCookBookOpen}
        setIsCookBookOpen={mockSetIsCookBookOpen}
      />
    ),
    {}
  );
  getByTestId = component.getByTestId;
});

test('should render component', () => {
  const nav = getByTestId('nav-container');
  expect(nav).toBeInTheDocument();
});

test('should render image', () => {
  const image = getByTestId('nav-logo');
  expect(image).not.toHaveAttribute('src', null);
});

test('should navigate to auth when button is pressed', () => {
  const link = getByTestId('nav-auth');
  history.push = jest.fn();
  fireEvent.click(link);
  expect(history.push).toHaveBeenCalledWith({
    hash: '',
    pathname: '/auth',
    search: '',
    state: null,
  });
});

test('should navigate to search when button is pressed', () => {
  const link = getByTestId('nav-search');
  history.push = jest.fn();
  fireEvent.click(link);
  expect(history.push).toHaveBeenCalledWith({
    hash: '',
    pathname: '/search',
    search: '',
    state: null,
  });
});

test('should navigate to cookbook when button is pressed', () => {
  const link = getByTestId('nav-cookbook');
  history.push = jest.fn();
  fireEvent.click(link);
  expect(history.push).toHaveBeenCalledWith({
    hash: '',
    pathname: '/cookbook',
    search: '',
    state: null,
  });
});

test('should navigate to home when button is pressed', () => {
  const link = getByTestId('nav-home');
  history.push = jest.fn();
  fireEvent.click(link);
  expect(history.push).toHaveBeenCalledWith({
    hash: '',
    pathname: '/',
    search: '',
    state: null,
  });
});

test('should display burger mobile nav when in mobile mode', () => {
  const component = renderWithRedux(
    renderWithRouter(
      <Nav
        isCookBookOpen={mockIsCookBookOpen}
        setIsCookBookOpen={mockSetIsCookBookOpen}
      />
    ),
    { initialState: { isMobile: true } }
  );
  const mobileNav = component.queryByTestId('nav-burger');
  expect(mobileNav).toBeInTheDocument();
});
