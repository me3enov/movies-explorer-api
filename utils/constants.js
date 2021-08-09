const dbAddress = 'mongodb://localhost:27017/bitfilmsdb';
const portNumber = 3000;

const validationErrorName = 'ValidationError';
const castErrorName = 'CastError';
const mongoErrorName = 'MongoError';

const errorMsgServer = 'Server error!';
const errorMsgPageNotFound = 'Page not found!';
const errorMsgLimit = 'Limiting to 100 requests per windowMs!';

const errorMsgAuthorization = 'Authorization required!';
const errorMsgIncorrectToken = 'Wrong token!';
const errorMsgIncorrectData = 'Wrong data!';
const errorMsgIncorrectMovieData = 'Incorrect movie data:';

const errorMsgValidation = 'Validation Error!';
const errorMsgInvalidURL = 'Invalid URL!';
const errorMsgInvalidEmail = 'Invalid email!';

const errorMsgItemNotFound = 'Movie not found!';
const errorMsgAccessDenied = 'Access is denied!';

const errorMsgUserNotFound = 'User not found!';
const errorMsgWrongId = 'Wrong ID!';

const errorMsgDuplicate = 'Duplicate key error index!';

module.exports = {
  dbAddress,
  portNumber,
  validationErrorName,
  castErrorName,
  mongoErrorName,
  errorMsgServer,
  errorMsgPageNotFound,
  errorMsgLimit,
  errorMsgAuthorization,
  errorMsgIncorrectToken,
  errorMsgIncorrectData,
  errorMsgIncorrectMovieData,
  errorMsgValidation,
  errorMsgInvalidURL,
  errorMsgInvalidEmail,
  errorMsgItemNotFound,
  errorMsgAccessDenied,
  errorMsgUserNotFound,
  errorMsgWrongId,
  errorMsgDuplicate,
};
