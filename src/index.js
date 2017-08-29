import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import persistState from 'redux-localstorage'

import todoApp from './reducers';
import App from './container/App';

import './index.css';

const enhancer = compose(
  persistState(),
);
const store = createStore(todoApp, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);