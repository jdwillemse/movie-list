import { combineReducers } from 'redux';

import user from './user';
import firebase from './firebase';

export default combineReducers({
  user,
  firebase,
});
