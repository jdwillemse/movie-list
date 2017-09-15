import firebase from 'firebase';

import { firebaseConfig } from '../config';
// import staticData from '../data-structure';

const fire = firebase.initializeApp(firebaseConfig);
const databaseInstance = fire.database().ref('movies');

// quick way to push dummy data to firebase
// staticData.map(item => {
//   fire.database().ref('movies').push( item );
// })

// Actions
const prefix = 'FIREBASE/';
const SET = `${prefix}SET`;
const GET = `${prefix}GET`;
const SUCCESS = `${prefix}SUCCESS`;
const FAIL = `${prefix}FAIL`;

// Reducer
const initialState = {
  loading: false,
  error: '',
  payload: [],
};

export default function reducer(state = initialState, action) {
  console.log(action.type);

  switch (action.type) {
    case GET:
      return {
        ...initialState,
      };

    case SUCCESS: {
      const modifiedData = Object.keys(action.payload).map(key =>
        Object.assign({}, action.payload[key], { id: key })
      );

      return {
        ...state,
        loading: false,
        error: '',
        payload: modifiedData,
      };
    }

    case FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

// Action creators
function getMovieListSuccess(payload) {
  return {
    type: SUCCESS,
    payload,
  };
}

function getMovieListFail(error) {
  return {
    type: FAIL,
    error,
  };
}

export function getMovieList() {
  return dispatch => {
    databaseInstance.on('value', snapshot => {
      const movieListData = snapshot.val();
      // TODO: handle error response
      if (movieListData) {
        dispatch(getMovieListSuccess(movieListData));
      } else {
        dispatch(getMovieListFail('No content was returned from the database'));
      }
    });

    return dispatch({
      type: GET,
    });
  };
}

export function updateMovieWatchStatus({ movieId, status }) {
  return dispatch => {
    console.log('updateMovieWatchStatus', movieId, status);

    const newData = {
      [`${movieId}/isWatched`]: status,
    };

    databaseInstance.update(newData);

    return dispatch({
      type: SET,
    });
  };
}
