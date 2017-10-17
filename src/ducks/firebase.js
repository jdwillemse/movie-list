import axios from 'axios';

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
const GET_SUCCESS = `${prefix}GET_SUCCESS`;
const SET_SUCCESS = `${prefix}SET_SUCCESS`;
const FAIL = `${prefix}FAIL`;

// Reducer
const initialState = {
  loading: false,
  error: '',
  movies: [],
};

function updateMovieWatchedStatus(item, { movieId, isWatched }) {
  return item.imdbID === movieId
    ? Object.assign({}, item, { isWatched })
    : item;
}

export default function reducer(state = initialState, action) {
  console.log(action.type);

  switch (action.type) {
    case GET:
      return {
        ...initialState,
      };

    case GET_SUCCESS: {
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
  const promise = axios.get('/api/firebase').then(res => res.data);

  return {
    types: [GET, GET_SUCCESS, FAIL],
    promise,
  };
}

/**
 * Post movie id and isWatched status to api and pass same info to reducer. This is done
 * becasue firebase's update method does not respond with data.
 * @param {object} object with movieId (string) and status (bool) props.
 * @returns {promise}
 */
export function updateMovieWatchStatus({ movieId, status }) {
  const postData = { movieId, isWatched: status };
  const promise = axios.post('/api/firebase', postData).then(() => postData);

  return {
    types: [SET, SET_SUCCESS, FAIL],
    promise,
  };
}
