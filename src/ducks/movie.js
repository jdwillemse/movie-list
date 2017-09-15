import axios from 'axios';

// Actions
const prefix = 'MOVIE/';
export const GET = `${prefix}GET`;
export const SUCCESS = `${prefix}SUCCESS`;
export const FAIL = `${prefix}FAIL`;
export const RESET = `${prefix}RESET`;

// Reducer
const initialState = {
  loading: true,
  error: '',
  payload: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        payload: action.payload,
      };

    case FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.toString(),
      };

    case RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

// Action Creators
export function fetchMovie(imdbId) {
  const promise = axios.post('/api/movie', { imdbId }).then(res => res.data);

  return {
    types: [GET, SUCCESS, FAIL],
    promise,
  };
}

export function resetMovieReducer() {
  return {
    type: RESET,
  };
}
