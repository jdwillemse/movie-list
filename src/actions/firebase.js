import firebase from 'firebase';

import { firebaseConfig } from '../config';

const fire = firebase.initializeApp(firebaseConfig);
const databaseInstance = fire.database().ref('movies');

export default databaseInstance;
