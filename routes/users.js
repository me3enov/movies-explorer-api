const users = require('express').Router();

const {
  validateUserUpdate,
} = require('../middlewares/requestValidation');

const {
  getUser,
  updateUser,
} = require('../controllers/users');

users.get('/users/me', getUser);

users.patch('/users/me', validateUserUpdate, updateUser);

module.exports = users;
