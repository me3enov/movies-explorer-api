const movies = require('express').Router();
const { validateMovie, validateId } = require('../middlewares/requestValidation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movies.get('/movies', getMovies);

movies.post('/movies', validateMovie, createMovie);

movies.delete('/movies/:movieId', validateId, deleteMovie);

module.exports = movies;
