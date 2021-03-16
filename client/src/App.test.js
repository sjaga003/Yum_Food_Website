import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers';

test('renders button', () => {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
  );
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const element = getByTestId('button');
  expect(element).toBeInTheDocument();
});
