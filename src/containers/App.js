import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// import FirstPage from './FirstPage';
// import SecondPage from './SecondPage';

import MovieList from '../containers/movie-list';
import Modal from '../components/modal';
import NoMatch from '../components/NoMatch';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render () {
    return (
      <div>
        <h1>Movie libraary</h1>
        <Switch>
          <Route path='/' component={MovieList} />
          <Route component={NoMatch} />
        </Switch>
        <Route path='/id/:id' component={Modal} />
      </div>
    );
  }
}
