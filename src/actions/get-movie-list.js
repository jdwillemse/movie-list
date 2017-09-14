import databaseInstance from './firebase';
import { GET, SUCCESS, FAIL } from '../types/firebase';
// import staticData from '../data-structure';

// export function set (payload) {
//   return {
//     type: SET,
//     payload
//   };
// }

function getMovieListSuccess (payload) {
  return {
    type: SUCCESS,
    payload,
  };
}

function getMovieListFail (error) {
  return {
    type: FAIL,
    error,
  };
}

const getMovieList = () => function (dispatch) {
  databaseInstance.on('value', (snapshot) => {
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

export default getMovieList;

// export const watchMovieList = () => function () {
//   return function (dispatch) {
//     const objectsToListenTo = [{
//       dbRef: db.child('data/movies'),
//       actions: {
//         add: (item) => dispatch({ type: 'ADD_MOVIE', item }),
//         remove: (key) => dispatch({ type: 'REMOVE_MOVIE', key }),
//       },
//     }];

//     class ListWatcher {
//       constructor () {
//         this.cache = {};
//       }

//       watchList (ref) {
//         ref.on('child_added', (snap) => this.onChildAdded(snap));
//         ref.on('child_removed', (snap) => this.onChildRemoved(snap));
//       }

//       onChildAdded (snapshot, type) {
//         // this.cache[snapshot.key] = new ObjectWatcher(snapshot, type);
//       }

//       onChildRemoved (snapshot) {
//         this.cache[snapshot.key].remove();
//         delete this.cache[snapshot.key];
//       }
//     }

//     const listWatcher = new ListWatcher();

//     objectsToListenTo.forEach((objectToListenTo) => {
//       listWatcher.watchList(objectToListenTo.dbRef);
//     });
//   }
// }
