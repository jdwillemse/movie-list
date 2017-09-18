import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StatusToggle from './status-toggle';

// eslint-disable-next-line react/prefer-stateless-function
class ListItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { data } = this.props;

    return (
      <Link
        to={`/id/${data.imdbID}`}
        className={`list__item ${data.isWatched
          ? 'list__item--watched'
          : 'list__item--unwatched'}`}
      >
        <StatusToggle
          id={data.id}
          isWatched={!!data.isWatched}
          dispatch={this.props.dispatch}
        />
        <div className="item__header">
          <span className="item__section item__section--no-truncate item__title">
            {data.Title}
          </span>
          <span className="item__section item__section--no-truncate">
            {data.Year}
          </span>
        </div>
        <span className="item__section">{data.Plot}</span>
      </Link>
    );
  }
}

export default ListItem;
