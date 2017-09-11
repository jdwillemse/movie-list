import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import NoMatch from '../components/NoMatch';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render () {
    return (
      <div>
        <h1>Server Side Rendering with Create React App v2</h1>
        <Switch>
          <Route exact path='/' component={FirstPage} />
          <Route path='/second' component={SecondPage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}
