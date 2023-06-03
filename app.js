const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const { createUser, login, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const allowedCors = [];

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', { useNewUrlParser: true });

app.use(requestLogger);

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

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signout', logout);

app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));

app.use('*', require('./routes/404'));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
