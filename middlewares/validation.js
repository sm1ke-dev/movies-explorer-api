const { celebrate, Joi } = require('celebrate');

const { REGEX_URL } = require('../utils/constants');

const updateProfileVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const createUserVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
});

const loginVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createMovieVal = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(REGEX_URL).required(),
    trailerLink: Joi.string().pattern(REGEX_URL).required(),
    thumbnail: Joi.string().pattern(REGEX_URL).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieVal = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  updateProfileVal, createUserVal, loginVal, createMovieVal, deleteMovieVal,
};
