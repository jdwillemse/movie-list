import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// import FirstPage from './FirstPage';
// import SecondPage from './SecondPage';

import MovieList from '../containers/movie-list';
import Modal from '../containers/modal';
import NoMatch from '../components/NoMatch';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  static focusOutlineToggle(event) {
    if (event.keyCode === 9) {
      document.body.classList.add('show-focus');
    } else if (event.type === 'click') {
      document.body.classList.remove('show-focus');
    }
  }

  componentDidMount() {
    document.body.addEventListener('keyup', App.focusOutlineToggle);
    document.body.addEventListener('click', App.focusOutlineToggle);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', App.focusOutlineToggle);
    document.body.removeEventListener('click', App.focusOutlineToggle);
  }

  render() {
    return (
      <div>
        <div className="intro">
          <h1 className="intro__title">Movie library</h1>
          <p className="intro__help-text">
            This is a list of movies that have passed through your dropbox and
            the watched state of each.
          </p>
          <noscript>
            <p className="noscript__warning">
              Without javascript enabled you wont see any content.
            </p>
          </noscript>
        </div>
        <Switch>
          <Route path="/" component={MovieList} />
          <Route component={NoMatch} />
        </Switch>
        <Route path="/id/:id" component={Modal} />
      </div>
    );
  }
}
