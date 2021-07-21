const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const {
  errorMsgUserNotFound,
  castErrorName,
  mongoErrorName,
  validationErrorName,
  errorMsgWrongId,
  errorMsgValidation,
  errorMsgDuplicate,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .orFail(new NotFoundError({ message: errorMsgUserNotFound }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === castErrorName) {
        next(new BadRequestError({ message: errorMsgWrongId }));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .catch((err) => {
      if (err.name === mongoErrorName || err.code === 11000) {
        throw new ConflictError({ message: errorMsgDuplicate });
      } else next(err);
    })
    .catch((err) => {
      if (err.name === validationErrorName || err.name === castErrorName) {
        throw new BadRequestError({ message: errorMsgValidation });
      } else {
        next(err);
      }
    })
    .then((user) => res.status(201).send({
      data: {
        email: user.email, name: user.name, _id: user._id,
      },
    }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const id = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === validationErrorName) {
        next(new BadRequestError({ message: errorMsgValidation }));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
