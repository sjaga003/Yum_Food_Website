import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'React';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import HowToSection from '../components/MainPage/HowToAnimation/HowToSection.js';
import rootReducer from '../reducers/index.js';
import initialState from '../reducers/isMobileReducer';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Auth from '../components/AuthPage/AuthPage.js';
let getByTestId;
const history = createMemoryHistory();

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

const renderWithRouter = (component) => {
  return <Router history={history}>{component}</Router>;
};

beforeEach(() => {
  const component = renderWithRedux(renderWithRouter(<HowToSection />));
  getByTestId = component.getByTestId;
});

test('should render component', () => {
  const home = getByTestId('howto-container');
  expect(home).toBeInTheDocument();
});

test('should navigate to auth page', () => {
  const link = getByTestId('howto-link');
  history.push = jest.fn();
  fireEvent.click(link);
  expect(history.push).toHaveBeenCalledWith('/auth');
});

test('should render drag and drop animation when on desktop', () => {
  cleanup();
  const componentInDesktop = renderWithRedux(
    renderWithRouter(<HowToSection />),
    { initialState: { isMobile: false } }
  );
  const animation = componentInDesktop.getByTestId('howto-animation-drag');
  expect(animation).toBeInTheDocument();
});

test('should render open animation when on mobile', () => {
  cleanup();
  const componentInDesktop = renderWithRedux(
    renderWithRouter(<HowToSection />),
    { initialState: { isMobile: true } }
  );
  const animation = componentInDesktop.getByTestId('howto-animation-open');
  expect(animation).toBeInTheDocument();
});
