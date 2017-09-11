import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import './App.css'

// eslint-disable-next-line react/prefer-stateless-function
class NoMatch extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render () {
    return (
      <div key={this.props.data.imdbID}>
        <p>{this.props.data.Title} – {this.props.data.Year}</p>
      </div>
    );
  }
}

export default NoMatch;

