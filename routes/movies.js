const router = require('express').Router();

const auth = require('../middlewares/auth');
const {
  createMovieVal, deleteMovieVal,
} = require('../middlewares/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, createMovieVal, createMovie);
router.delete('/movies/:_id', auth, deleteMovieVal, deleteMovie);

module.exports = router;
