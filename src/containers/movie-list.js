import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import ListItem from '../components/ListItem';
import { getMovieList, updateMovieWatchStatus } from '../ducks/firebase';

class MovieList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    movieListData: PropTypes.array.isRequired,
    firebase: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    // console.log('this.props.dispatch', this.props.dispatch);
    this.props.dispatch(getMovieList());
    // this.props.dispatch(watchMovieList());
  }

  handleChange(movieProps) {
    this.props.dispatch(updateMovieWatchStatus(movieProps));
  }

  render() {
    const { movieListData } = this.props;

    return (
      <div className="list">
        <div className="list__wrapper">
          {this.props.firebase.loading && <p>Loading…</p>}
          {movieListData &&
            movieListData.map(item => (
              <ListItem
                key={item.id}
                data={item}
                onChange={this.handleChange}
              />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  firebase: state.firebase,
  movieListData: state.firebase.payload,
});

export default connect(mapStateToProps)(MovieList);
