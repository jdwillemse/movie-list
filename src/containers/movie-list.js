import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import Loader from '../components/loader';
import Error from '../components/error';
import ListItem from '../components/ListItem';
import { getMovieList } from '../ducks/firebase';

class MovieList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    movieListData: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.dispatch(getMovieList());
  }

  render() {
    const { loading, error, movieListData } = this.props;

    return (
      <div className="list">
        <div className="list__wrapper">
          <Loader loading={loading} />
          <Error message={error} />
          {movieListData &&
            movieListData.map(item => (
              <ListItem
                key={item.id}
                data={item}
                dispatch={this.props.dispatch}
              />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  firebase: state.firebase,
  loading: state.firebase.loading,
  error: state.firebase.error,
  movieListData: state.firebase.movies,
});

export default connect(mapStateToProps)(MovieList);
