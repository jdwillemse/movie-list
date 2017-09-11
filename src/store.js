import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
// import createLogger from 'redux-logger'
// import createSagaMiddleware from 'redux-saga'

// const logger = createLogger()
// const sagaMiddleware = createSagaMiddleware()

export default function configureStore (initialState = {}) {
  // Create the store with two middlewares
  const middlewares = [
    thunk,
  //  sagaMiddleware
  //, logger
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  const store = createStore(
    reducers
  , initialState
  , compose(...enhancers)
  );

  // Extensions
  // store.runSaga = sagaMiddleware.run
  store.asyncReducers = {}; // Async reducer registry

  return store;
}
