import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { Link } from 'react-router-dom';

import ListItem from '../components/ListItem';
import getMovieList from '../actions/get-movie-list';
import './FirstPage.css';

class FirstPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    firebase: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
      payload: PropTypes.object.isRequired,
    }).isRequired,
  }

  componentWillMount () {
    // console.log('this.props.dispatch', this.props.dispatch);
    this.props.dispatch(getMovieList());
    // this.props.dispatch(watchMovieList());
  }

  render () {
    const movieListData = this.props.firebase.payload;
    console.log('------', movieListData);

    return (
      <div className='bold'>
        <h2>First Page</h2>
        {movieListData && Object.keys(movieListData).map((key) => <ListItem data={movieListData[key]} key={key} />)}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  // user: state.user,
  firebase: state.firebase,
});

export default connect(mapStateToProps)(FirstPage);
