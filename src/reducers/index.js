import { combineReducers } from 'redux';

import firebase from './firebase';
import movie from '../ducks/movie';

export default combineReducers({
  firebase,
  movie,
});
