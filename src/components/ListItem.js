import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import './App.css'

// eslint-disable-next-line react/prefer-stateless-function
class ListItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange() {
    const movieProps = {
      status: !this.props.data.isWatched,
      movieId: this.props.data.id,
    };
    // console.log(movieProps);
    // fire db updte
    this.props.onChange(movieProps);
  }

  render() {
    const { data } = this.props;

    return (
      <div
        className={`list__item ${data.isWatched
          ? 'list__item--watched'
          : 'list__item--unwatched'}`}
        onDoubleClick={event => this.handleChange(event)}
      >
        <span
          className={`item__status ${data.isWatched
            ? 'item__status--watched'
            : 'item__status--unwatched'}`}
        >
          <span>✔</span>
        </span>
        <div className="item__header">
          <Link
            to={`/id/${data.imdbID}`}
            className="item__section item__section--no-truncate item__title"
          >
            {data.Title}
          </Link>
          <span className="item__section item__section--no-truncate">
            {data.Year}
          </span>
        </div>
        <span className="item__section">{data.Plot}</span>
      </div>
    );
  }
}

export default ListItem;
