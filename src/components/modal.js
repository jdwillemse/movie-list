import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  componentDidMount () {
    this.keyListener = this.keyListener.bind(this);
    document.body.addEventListener('keyup', this.keyListener);
  }

  componentWillUnmount () {
    document.body.removeEventListener('keyup', this.keyListener);
  }

  keyListener (event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  }

  closeModal () {
    this.props.history.push('/');
  }

  render () {
    const { id } = this.props.match.params;
    const { movieListData } = this.props;
    const movieData = movieListData.find((item) => item.id === id);

    // console.log('movieData', movieData);

    /* eslint-disable-next-line react/prefer-stateless-function */
    return movieData ? (
      <article
        className='modal'
        onClick={() => this.closeModal()}
      >
        <div className='modal__wrap'>
          <button
            className='modal__close'
            onClick={() => this.closeModal()}
          >
            <span>Close</span>
          </button>
          <div className='modal__content'>
            <img
              src={movieData.Poster}
              alt={`Movie poster for ${movieData.Title}`}
              className='modal__image'
            />
            <div className='modal__copy'>
              <h1>{movieData.Title}</h1>
              <p>{movieData.Director} – {movieData.Year} – {movieData.Runtime}</p>
              <p>{movieData.Plot}</p>
            </div>
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
