const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  validationErrorName,
  castErrorName,
  errorMsgIncorrectMovieData,
  errorMsgItemNotFound,
  errorMsgAccessDenied,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
    movieId,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === validationErrorName) {
        next(new BadRequestError({ message: `${errorMsgIncorrectMovieData} ${err.message}` }));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;

  Movie.findMovieAndOwner(movieId)
    .orFail(new NotFoundError({ message: errorMsgItemNotFound }))
    .then((movie) => {
      if (movie.owner.toString() === owner) {
        return Movie.findByIdAndRemove(movieId)
          .orFail(new NotFoundError({ message: errorMsgItemNotFound }))
          .then((data) => {
            res.send({ data });
          })
          .catch((err) => {
            if (err.name === castErrorName) {
              next(new BadRequestError({ message: errorMsgItemNotFound }));
            } else {
              next(err);
            }
          });
      }
      return next(new ForbiddenError({ message: errorMsgAccessDenied }));
    })
    .catch((err) => {
      if (err.name === castErrorName) {
        next(new BadRequestError({ message: errorMsgItemNotFound }));
      } else {
        next(err);
      }
    });
};
