const { SERVER_ERR } = require('../utils/constants');

module.exports = function (err, req, res, next) {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? SERVER_ERR : message,
  });
  next();
};
