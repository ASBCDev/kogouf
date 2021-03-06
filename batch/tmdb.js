const superagent = require('superagent');

const tmdb = {};

const TMDB_API = 'https://api.themoviedb.org/3';
const TMDB_KEY = process.env.TMDB_API_KEY;

/**
 * Helper to make a request to the TMDB API.
 * @param {string} method The request method: get, post, put or delete
 * @param {string} path The relative TMDB request path
 * @param {object} parameters Additional parameters to send
 * @returns Promise
 */
const _request = function (method, path, parameters) {
  return new Promise((resolve, reject) => {
    console.log(`${method} ${path}`);
    superagent[method](`${TMDB_API}${path}`)
      .query(Object.assign({
        api_key: TMDB_KEY,
        language: 'fr-FR'
      }, parameters))
      .end((err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

/**
 * Simple helper to make a get request
 * @param {*} args _request function signature without method
 * @returns Promise
 */
const _get = function (...args) {
  return _request('get', ...args);
};

/**
 * Get movie details by its id
 * @param {string} id The movie id
 * @returns Promise
 */
tmdb.getMovie = function (id) {
  return _get(`/movie/${id}`);
};

/**
 * Get the most top rated movies
 * @param {number} page The page number
 * @returns Promise
 */
tmdb.getTopRated = function (page) {
  return _get('/movie/top_rated', { page });
};

module.exports = tmdb;
