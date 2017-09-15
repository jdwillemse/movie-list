import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
// import createLogger from 'redux-logger'
// import createSagaMiddleware from 'redux-saga'

// const logger = createLogger()
// const sagaMiddleware = createSagaMiddleware()

// Middleware for reducing boilerplate when using async actions
function promiseMiddleware() {
  return next => action => {
    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });
    return promise.then(
      payload => next({ ...rest, payload, type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE })
    );
  };
}

export default function configureStore(initialState = {}) {
  // Create the store with two middlewares
  const middlewares = [
    thunk,
    promiseMiddleware,
    //  sagaMiddleware
    // , logger
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(reducers, initialState, compose(...enhancers));

  // Extensions
  // store.runSaga = sagaMiddleware.run
  store.asyncReducers = {}; // Async reducer registry

  return store;
}
