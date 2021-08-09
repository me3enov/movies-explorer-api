const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const {
  errorMsgInvalidURL,
} = require('../utils/constants');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError(errorMsgInvalidURL);
  }
  return value;
};

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(urlValidation).required(),
    trailer: Joi.string().custom(urlValidation).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().custom(urlValidation).required(),
    movieId: Joi.number().integer().required(),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validateUser = celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().min(2).max(30),
  },
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

module.exports = {
  validateMovie,
  validateId,
  validateUser,
  validateUserUpdate,
  validateLogin,
};
