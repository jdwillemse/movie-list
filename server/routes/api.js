const express = require('express');
const fetch = require('node-fetch');
const firebase = require('firebase');

const dropboxProcessor = require('../dropbox-processor');

const router = express.Router();
const OMDB_URL = 'https://www.omdbapi.com/';
const { OMDB_KEY, FIREBASE_PROJECT_ID } = process.env;
const firebaseConfig = {
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: '',
};
const fire = firebase.initializeApp(firebaseConfig);
const databaseInstance = fire.database().ref('movies');

const errorHandler = (res, error) => {
  console.log('--Error:', error);
  res.status(error.status).send(error);
};

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// router.get('/', (req, res, next) => {
//   res.json({});
// });

/**
 * Fetch movie from OMDBapi based on the IMDb id
 * @param {object} req - http request object.
 * @param {object} res - http response object.
 */
router.post('/movie', (req, res) => {
  fetch(`${OMDB_URL}?apikey=${OMDB_KEY}&i=${req.body.imdbId}`)
    .then(response => {
      if (response.status !== 200) {
        throw response;
      }
      return response.json();
    })
    .then(json => {
      res.json(json);
    })
    .catch(error => {
      errorHandler(res, error);
    });
});

/**
 * Get a list of movie entries from firebase.
 * @param {object} req - http request object.
 * @param {object} res - http response object.
 */
router.get('/firebase', (req, res) => {
  databaseInstance
    .once('value')
    .then(snapshot => snapshot.val())
    .then(json => {
      const values = Object.values(json);
      res.json(values);
    })
    .catch(error => {
      errorHandler(res, error);
    });
});

/**
 * Update isWatched status on firebase based on movie id.
 * @param {object} req - http request object.
 * @param {object} res - http response object.
 */
router.post('/firebase', (req, res) => {
  const { movieId, isWatched } = req.body;

  databaseInstance
    .update({ [`${movieId}/isWatched`]: isWatched })
    .then(() => {
      res.status(200);
      res.send();
    })
    .catch(error => {
      errorHandler(res, error);
    });
});

/**
 * Respond to the dropbox webhook verification (GET request) by echoing back the challenge parameter.
 * @param {object} req - http request object.
 * @param {object} res - http response object.
 */
router.get('/webhook', (req, res) => {
  res.send(req.query && req.query.challenge);
});

/**
 * Receive a list of changed user IDs from Dropbox and process each.
 * @param {object} req - http request object.
 * @param {object} res - http response object.
 */
router.post('/webhook', (req, res) => {
  dropboxProcessor();
  res.status(200);
  res.send();
});

module.exports = router;
