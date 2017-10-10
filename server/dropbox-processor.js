const Dropbox = require('dropbox');
const fetch = require('node-fetch');
const querystring = require('querystring');

const OMDB_URL = 'https://www.omdbapi.com/';

const { DROPBOX_ACCESS_TOKEN, OMDB_KEY, FIREBASE_PROJECT_ID } = process.env;

/**
 * Torrent file names are split appart to extract title and release year info.
 * Files names are assumed to correspond to this format TITLE.YEAR.[etc]
 * eg. 'Hrútar AKA Rams.2015.720p.Blu-ray.x264.MKV.427355.torrent'.
 * Nothing happens async but a promise is returned to allow promise chainging
 * and a single point for handling errors.
 * @param {string} filename - The updated file name.
 * @returns {promise}
 */
function processFilename(filename) {
  return new Promise((resolve, reject) => {
    // find the date chunk and assume everything before is the title
    const chunks = filename.split(/(\.(19|20)[0-9]{2})/);
    const rawTitle = chunks[0];
    const rawDate = chunks[1];
    const output = {};

    // dont operate on tv torrents or malformed filenames
    if (!filename.match(/(s[0-9]{2})/i) && chunks.length > 1) {
      const title = rawTitle.split('/').pop();
      const titleProps = {
        title,
        englishTitle: title.split(/( aka )/i).pop(),
      };

      Object.assign(output, {
        ...titleProps,
        year: rawDate.slice(1),
      });
    }

    if (Object.keys(output).length === 0) {
      reject('Movie title could not be parsed');
    }

    resolve(output);
  });
}

/**
 * With basic movie info an API is queried to fetch more details. If the movie is not found
 * and exception is thrown.
 * @param {object} movie - Object with title and year props.
 * @returns {promise}
 */
function fethMovieData(movie) {
  const query = querystring.stringify({
    apikey: OMDB_KEY,
    t: movie.englishTitle || movie.title,
    y: movie.year,
  });

  return fetch(`${OMDB_URL}?${query}`).then(response => {
    if (response.status !== 200) {
      throw response;
    }
    // preserve orginal title because omdbapi only returns english version
    return response
      .json()
      .then(movieData => Object.assign({}, movieData, { Title: movie.title }));
  });
}

/**
 * Take movie data and create an entry with metadata to save to Firebase
 * @param {object} This is an object containing rich info about a movie.
 * @returns {promise}
 */
function pushToFirebase({ imdbID, Title, Year, Plot }) {
  const movieWithMeta = {
    imdbID,
    Title,
    Year,
    Plot,
    isWatched: false,
    addedAt: new Date().toString(),
  };
  return fetch(
    `https://${FIREBASE_PROJECT_ID}.firebaseio.com/movies/${imdbID}.json`,
    {
      method: 'PUT',
      body: JSON.stringify(movieWithMeta),
    }
  );
}

/**
 * Dropbox passes user info of users whose files have changed (hardcoded to me).
 * Info for the updated file list is then collected and processed.
 * Movie details are fetched from OMDBapi and then saved to firebase.
 */
module.exports = function dropboxProcessor() {
  const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });
  dbx
    .filesListFolder({ path: '' })
    .then(response => {
      response.entries.forEach(file =>
        processFilename(file.name)
          .then(procesesedFile => fethMovieData(procesesedFile))
          .then(movie => pushToFirebase(movie))
          .catch(err => {
            console.log('---error', err);
          })
      );
    })
    .catch(err => {
      console.log('---error', err);
    });
};
