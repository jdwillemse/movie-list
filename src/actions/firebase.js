import firebase from 'firebase';

import { firebaseConfig } from '../config';
// import staticData from '../data-structure';

const fire = firebase.initializeApp(firebaseConfig);
const databaseInstance = fire.database().ref('movies');

// quick way to push dummy data to firebase
// staticData.map(item => {
//   fire.database().ref('movies').push( item );
// })

export default databaseInstance;
