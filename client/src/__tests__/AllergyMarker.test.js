import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'React';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import AllergyMarker from '../components/RecipeCard/RecipeDetail/AllergyMarker';
import RecipeDetail from '../components/RecipeCard/RecipeDetail/RecipeDetail';
import { recipePreviewPopular } from '../recipePreviewData';
import rootReducer from '../reducers';

let getByTestId;
let debug;

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
      <AllergyMarker
        labelName="test-name"
        external={false}
        iconName={faSyncAlt}
      />
    ),
    {}
  );
  getByTestId = component.getByTestId;
  debug = component.debug;
});

test('should render component', () => {
  const allergy = getByTestId('allergy-marker-container');
  expect(allergy).toBeInTheDocument();
});

test('should render passed in label name', () => {
  const label = getByTestId('allergy-marker-label');
  expect(label.textContent).toBe('test-name');
});

test('should render icon based on iconName when not external', () => {
  const svg = getByTestId('allergy-marker-icon');
  expect(svg).toBeInTheDocument();
  expect(svg).toHaveAttribute('data-icon', 'sync');
});

test('should render icon based on passed in svg when external', () => {
  cleanup();
  const component = renderWithRedux(
    renderWithRouter(
      <AllergyMarker
        labelName="test-name"
        external={true}
        iconName={<svg data-testid="external-svg"></svg>}
      />
    ),
    {}
  );
  const iconContainer = component.getByTestId('external-svg');
  expect(iconContainer).toBeInTheDocument();
});

test('should not render passed in svg when external', () => {
  cleanup();
  const component = renderWithRedux(
    renderWithRouter(
      <AllergyMarker
        labelName="test-name"
        external={false}
        iconName={<svg data-testid="external-svg"></svg>}
      />
    ),
    {}
  );
  const iconContainer = component.queryByTestId('external-svg');
  expect(iconContainer).not.toBeInTheDocument();
});
