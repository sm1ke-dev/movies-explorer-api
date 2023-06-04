const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');
const { TOKEN_NOT_FOUND, UNAUTHORIZED_ERR } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!req.cookies.jwt) {
    return next(new UnauthorizedError(TOKEN_NOT_FOUND));
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERR));
  }

  req.user = payload;
  return next();
};
