const mongoose = require('mongoose');
const { REGEX_URL } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (v) => REGEX_URL.test(v),
      message: 'Invalid link',
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (v) => REGEX_URL.test(v),
      message: 'Invalid link',
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (v) => REGEX_URL.test(v),
      message: 'Invalid link',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('movie', movieSchema);
