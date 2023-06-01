const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!req.cookies.jwt) {
    return next(new Error('Токен не найден'));
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return next(new Error('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
