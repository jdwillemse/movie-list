const express = require('express');

const router = express.Router();
const fetch = require('node-fetch');

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

router.post('/movie', (req, res) => {
  fetch(`${OMDB_URL}?apikey=f369371&i=${req.body.imdbId}`)
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

module.exports = router;
