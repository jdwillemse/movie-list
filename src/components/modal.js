import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './modal.css';


// eslint-disable-next-line react/prefer-stateless-function
class Modal extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.object.isRequired,
    movieListData: PropTypes.array.isRequired,
  }

  render () {
    const { id } = this.props.match.params;
    const { movieListData } = this.props;
    const movieData = movieListData.find((item) => item.id === id);

    console.log('this.props.history', this.props.history);

    return movieData ? (
      <article className='modal'>
        <div className='modal__wrap'>
          <button onClick={() => this.props.history.push('/')}>Close</button>
          <div>
            <h1>{movieData.Title}</h1>
            <img src={movieData.Poster} alt={`Movie poster for ${movieData.Title}`} />
            <p>{movieData.Plot}</p>
          </div>
        </div>
      </article>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  movieListData: state.firebase.payload,
});

export default connect(mapStateToProps)(Modal);
