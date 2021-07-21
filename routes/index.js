const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const { login, createUser } = require('../controllers/users');
const { validateUser, validateLogin } = require('../middlewares/requestValidation');

const {
  errorMsgPageNotFound,
} = require('../utils/constants');

const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const userRouter = require('./users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);

router.use('/', auth, moviesRouter);
router.use('/', auth, userRouter);

router.use('/*', () => {
  throw new NotFoundError({ message: errorMsgPageNotFound });
});

module.exports = router;
