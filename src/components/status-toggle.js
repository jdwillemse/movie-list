import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateMovieWatchStatus } from '../ducks/firebase';

class StatusToggle extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    isWatched: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handleChange(event) {
    event.preventDefault();

    const movieProps = {
      status: !this.props.isWatched,
      movieId: this.props.id,
    };

    // fire db updte
    this.props.dispatch(updateMovieWatchStatus(movieProps));
  }

  render() {
    const tabProp = this.props.isWatched && { tabIndex: -1 };

    return (
      <button
        {...tabProp}
        onClick={event => this.handleChange(event)}
        className={`item__status ${this.props.isWatched
          ? 'item__status--watched'
          : 'item__status--unwatched'}`}
      >
        <span>✔</span>
      </button>
    );
  }
}

export default StatusToggle;
