const firebaseConfig = {
  apiKey: 'AIzaSyBB41DjIGX3AkQSx6m0e8k5JNYsqOdkcz4',
  authDomain: 'movie-list-88564.firebaseapp.com',
  databaseURL: 'https://movie-list-88564.firebaseio.com',
  projectId: 'movie-list-88564',
  storageBucket: '',
  messagingSenderId: '95918108054'
};
const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : '';

export {
  firebaseConfig,
  apiUrl,
};
