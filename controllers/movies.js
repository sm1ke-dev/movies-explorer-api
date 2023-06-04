const Movie = require('../models/movie');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors');
const { BAD_REQUEST, FILM_NOT_FOUND, FORBIDDEN_ERR } = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send({ data: movies.filter((movie) => movie.owner.toString() === req.user._id) });
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError(FILM_NOT_FOUND);
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params._id)
          .then((deletedMovie) => res.send({ data: deletedMovie }))
          .catch(next);
      } else {
        return Promise.reject(new ForbiddenError(FORBIDDEN_ERR));
      }
      return Promise.resolve();
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
