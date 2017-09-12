import databaseInstance from './firebase';
// import { SET, SUCCESS, FAIL } from '../types/update-movie-watch-status';
import { SET } from '../types/update-movie-watch-status';

// function updateMovieWatchStatusSuccess (payload) {
//   return {
//     type: SUCCESS,
//     payload,
//   };
// }

// function updateMovieWatchStatusFail (error) {
//   return {
//     type: FAIL,
//     error,
//   };
// }

const updateMovieWatchStatus = ({ movieId, status }) => function (dispatch) {
  console.log('updateMovieWatchStatus', movieId, status);
  // databaseInstance.on('value', (snapshot) => {
  //   const movieListData = snapshot.val();
  //   // TODO: handle error response
  //   if (movieListData) {
  //     dispatch(updateMovieWatchStatusSuccess(movieListData));
  //   } else {
  //     dispatch(updateMovieWatchStatusFail('No content was returned from the database'));
  //   }
  // });

  const newData = {
    [`${movieId}/isWatched`]: status,
  };

  databaseInstance.update(newData);

  return dispatch({
    type: SET,
  });
};


export default updateMovieWatchStatus;

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
