import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchMovie, resetMovieReducer } from '../ducks/movie';
import Loader from '../components/loader';
import Error from '../components/error';

// eslint-disable-next-line react/prefer-stateless-function
class Modal extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    movieData: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.keyListener = this.keyListener.bind(this);
    document.body.addEventListener('keyup', this.keyListener);

    this.props.dispatch(fetchMovie(this.props.match.params.id));
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.keyListener);

    this.props.dispatch(resetMovieReducer());
  }

  keyListener(event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  }

  closeModal() {
    this.props.history.push('/');
  }

  render() {
    const { loading, error, movieData } = this.props;

    return (
      <article className="modal" onClick={() => this.closeModal()}>
        <div className="modal__wrap">
          <button className="modal__close" onClick={() => this.closeModal()}>
            <span>Close</span>
          </button>

          <Loader loading={loading} />
          <Error message={error} />

          {!loading &&
            movieData && (
              <div className="modal__content">
                <img
                  src={movieData.Poster}
                  alt={`Movie poster for ${movieData.Title}`}
                  className="modal__image"
                />
                <div className="modal__copy">
                  <h1>{movieData.Title}</h1>
                  <p>
                    {movieData.Director} – {movieData.Year} –{' '}
                    {movieData.Runtime}
                  </p>
                  <p>{movieData.Plot}</p>
                </div>
              </div>
            )}
        </div>
      </article>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.movie.loading,
  error: state.movie.error,
  movieData: state.movie.payload,
});

export default connect(mapStateToProps)(Modal);
