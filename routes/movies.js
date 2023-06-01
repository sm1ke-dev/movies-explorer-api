const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { REGEX_URL } = require('../utils/constants');

router.get('/', getMovies);
router.post('/', celebrate({
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
    nameRU: Joi.number().required(),
    nameEN: Joi.number().required(),
  }),
}), createMovie);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

module.exports = router;
