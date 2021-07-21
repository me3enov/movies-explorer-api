const rateLimit = require('express-rate-limit');

const {
  errorMsgLimit,
} = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: errorMsgLimit,
});

module.exports = limiter;
