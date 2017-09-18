import React from 'react';
import PropTypes from 'prop-types';

import { updateMovieWatchStatus } from '../ducks/firebase';

function handleChange(event, { id, isWatched, dispatch }) {
  event.preventDefault();

  const movieProps = {
    status: !isWatched,
    movieId: id,
  };

  // fire db updte
  dispatch(updateMovieWatchStatus(movieProps));
}

function StatusToggle(props) {
  const tabProp = props.isWatched && { tabIndex: -1 };

  return (
    <button
      {...tabProp}
      onClick={event => handleChange(event, props)}
      className={`item__status ${props.isWatched
        ? 'item__status--watched'
        : 'item__status--unwatched'}`}
    >
      {/*
        <span>✔</span>
    */}
      <span>
        <img src="/images/tick.png" alt="" />
      </span>
    </button>
  );
}

StatusToggle.propTypes = {
  id: PropTypes.string.isRequired,
  isWatched: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default StatusToggle;

// valid by IYIKON from the Noun Project
