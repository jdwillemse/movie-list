import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';

import configureStore from './store';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
// import routes from './routes';
import './index.css';

// Initial state is created on the server
// eslint-disable-next-line no-underscore-dangle
const initialState = window.__REDUX_STATE__;
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
, document.getElementById('root')
);

// const AppRouter = () => {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         {renderRoutes(routes)}
//       </BrowserRouter>
//     </Provider>
//   )
// }

// ReactDOM.render(<AppRouter />, document.querySelector('#root'));

registerServiceWorker();
