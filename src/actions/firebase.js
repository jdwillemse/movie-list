import firebase from 'firebase';

import { firebaseConfig } from '../config';
import { SET, GET, FAIL } from '../types/firebase';
// import staticData from '../data-structure';


const fire = firebase.initializeApp(firebaseConfig);
const db = fire.database().ref('movies');

export function set (payload) {
  return {
    type: SET,
    payload
  };
}

function getMovieListSuccess (payload) {
  return {
    type: GET,
    payload,
  };
}

function getMovieListFail (error) {
  return {
    type: FAIL,
    error,
  };
}

export const getMovieList = () => function getMovieListInner (dispatch) {
    // staticData.map(item => {
    //   fire.database().ref('movies').push( item );
    // })

  return db.on('value', (snapshot) => {
    const movieListData = snapshot.val();
    // TODO: handle error response
    if (movieListData) {
      dispatch(getMovieListSuccess(movieListData));
    } else {
      dispatch(getMovieListFail('No content was returned from the database'));
    }
  });

  // return dispatch({
  //   type: GET,
  //   payload: staticData
  // });
};

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
//   };
// };
