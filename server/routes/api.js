const express = require('express');
const fetch = require('node-fetch');

const dropboxProcessor = require('../dropbox-processor');

const router = express.Router();

const OMDB_URL = 'https://www.omdbapi.com/';

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

// Fetch movie based on IMDb id
router.post('/movie', (req, res) => {
  fetch(`${OMDB_URL}?apikey=${process.env.OMDB_KEY}&i=${req.body.imdbId}`)
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
      res.status(error.status).send(error);
    });
});

// Respond to the dropbox webhook verification (GET request) by echoing back the challenge parameter.
router.get('/webhook', (req, res) => {
  res.send(req.query && req.query.challenge);
});

// Receive a list of changed user IDs from Dropbox and process each.
router.post('/webhook', (req, res) => {
  dropboxProcessor();
  res.status(200);
  res.send();
});

module.exports = router;
