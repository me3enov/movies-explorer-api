const {
  errorMsgServer,
} = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res
      .status(err.status)
      .send(err.message);
    return;
  }
  res
    .status(500)
    .send({ message: `${errorMsgServer} ${err.name}` });
  next();
};

module.exports = errorHandler;
