require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOption } = require('./middlewares/corsOption');
const limiter = require('./middlewares/rateLimit');
const errorHandler = require('./middlewares/errorHandler');

const {
  dbAddress,
  portNumber,
} = require('./utils/constants');

const { PORT = portNumber } = process.env;

const app = express();

app.use(cors(corsOption));

mongoose.connect(dbAddress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(helmet());

app.use(limiter);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
