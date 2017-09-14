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
        <div className='intro'>
          <h1 className='intro__title'>Movie library</h1>
          <p className='intro__help-text'>Double click movie to mark it as watched.</p>
          <noscript>
            <p className='noscript__warning'>Without javascript enabled you wont see any content.</p>
          </noscript>
        </div>
        <Switch>
          <Route path='/' component={MovieList} />
          <Route component={NoMatch} />
        </Switch>
        <Route path='/id/:id' component={Modal} />
      </div>
    );
  }
}
