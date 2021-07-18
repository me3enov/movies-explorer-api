const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const { validateUser, validateLogin } = require('../middlewares/requestValidation');

const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const userRouter = require('./users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);

router.use('/', auth, moviesRouter);
router.use('/', auth, userRouter);

module.exports = router;
