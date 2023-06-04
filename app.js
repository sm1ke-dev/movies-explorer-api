const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

// const { PRODUCTION_DB } = require('./utils/config');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/rate-limiter-config');

require('dotenv').config();

const allowedCors = [];

// const { PORT = 3001, NODE_ENV, DB_ADDRESS } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', { useNewUrlParser: true });

app.use(requestLogger);

app.use(helmet());
app.use(limiter);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);

    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
});

app.use('/', require('./routes'));

app.use(errorLogger);

app.use(errors());

app.use(require('./middlewares/error-handler'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
