const mongoose = require('mongoose');
const validator = require('validator');
const NotFoundError = require('../errors/NotFoundError');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link,
          {
            protocols: ['http', 'https', 'ftp'],
            require_protocol: true,
          });
      },
      message: 'Invalid URL',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link,
          {
            protocols: ['http', 'https', 'ftp'],
            require_protocol: true,
          });
      },
      message: 'Invalid URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link,
          {
            protocols: ['http', 'https', 'ftp'],
            require_protocol: true,
          });
      },
      message: 'Invalid URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /[а-я0-9А-я\-ёЁ\s\S]*/.test(v);
      },
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /[a-z0-9A-z\-\s!?]*/.test(v);
      },
    },
  },
});

movieSchema.statics.findMovieAndOwner = function getMovie(id) {
  return this.findById(id).select('+owner')
    .then((data) => {
      if (!data) {
        throw new NotFoundError({ message: 'Movie not found!' });
      }
      return data;
    });
};

module.exports = mongoose.model('movie', movieSchema);
