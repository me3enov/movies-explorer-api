const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const {
  errorMsgIncorrectToken,
  errorMsgAuthorization,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const cutBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError({ message: errorMsgIncorrectToken });
  }

  const token = cutBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError({ message: errorMsgAuthorization });
  }
  req.user = payload;

  next();
};
