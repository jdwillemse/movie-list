import firebase from 'firebase';

const firebaseConfig = {
  authDomain: 'movie-list-88564.firebaseapp.com',
  databaseURL: 'https://movie-list-88564.firebaseio.com',
  projectId: 'movie-list-88564',
  storageBucket: '',
};

const fire = firebase.initializeApp(firebaseConfig);
const databaseInstance = fire.database().ref('movies');

// quick way to push dummy data to firebase
// import staticData from '../data-structure';
// staticData.map((item) => {
//   const { imdbID, Title, Year, Plot } = item;
//   const movieWithMeta = {
//     imdbID,
//     Title,
//     Year,
//     Plot,
//     isWatched: true,
//     addedAt: new Date().toString(),
//   };
//   fire.database().ref('movies').child(imdbID).set(movieWithMeta);
// });

// Actions
const prefix = 'FIREBASE/';
const SET = `${prefix}SET`;
const GET = `${prefix}GET`;
const SUCCESS = `${prefix}SUCCESS`;
const SET_SUCCESS = `${prefix}SET_SUCCESS`;
const FAIL = `${prefix}FAIL`;

// Reducer
const initialState = {
  loading: false,
  error: '',
  movies: [],
};

function updateMovieWatchedStatus(item, { movieId, status }) {
  return item.id === movieId
    ? Object.assign({}, item, { isWatched: status })
    : item;
}

export default function reducer(state = initialState, action) {
  console.log(action.type);

  switch (action.type) {
    case GET:
      return {
        ...initialState,
      };

    case SUCCESS: {
      const moviesByDateAdded = action.payload.sort(
        (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
      );
      return {
        ...state,
        loading: false,
        error: '',
        movies: moviesByDateAdded,
      };
    }

    case SET_SUCCESS: {
      const movies = state.movies.map(item =>
        updateMovieWatchedStatus(item, action.payload)
      );
      return {
        ...state,
        loading: false,
        error: '',
        movies,
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
export function getMovieList() {
  const promise = databaseInstance
    .once('value')
    .then(snapshot => snapshot.val())
    .then(data =>
      Object.keys(data).map(key => Object.assign({}, data[key], { id: key }))
    );

  return {
    types: [GET, SUCCESS, FAIL],
    promise,
  };
}

export function updateMovieWatchStatus({ movieId, status }) {
  return dispatch => {
    const updatedData = {
      [`${movieId}/isWatched`]: status,
    };

    const promise = databaseInstance.update(updatedData).then(() => ({
      movieId,
      status,
    }));

    return dispatch({
      types: [SET, SET_SUCCESS, FAIL],
      promise,
    });
  };
}
