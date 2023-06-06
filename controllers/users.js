const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { NotFoundError, BadRequestError, ConflictingRequestError } = require('../utils/errors');
const {
  USER_NOT_FOUND, SAME_EMAIL, BAD_REQUEST, AUTH_SUCCESS, LEAVED_ACCOUNT,
} = require('../utils/constants');

const getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND);
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictingRequestError(SAME_EMAIL));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST));
      } if (err.code === 11000) {
        return next(new ConflictingRequestError(SAME_EMAIL));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ message: AUTH_SUCCESS });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: LEAVED_ACCOUNT });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyInfo, updateProfile, createUser, login, logout,
};
