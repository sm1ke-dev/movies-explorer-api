const router = require('express').Router();

const auth = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors');
const { PAGE_NOT_FOUND } = require('../utils/constants');

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND));
});

module.exports = router;
