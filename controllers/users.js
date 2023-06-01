const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { NotFoundError, BadRequestError, ConflictingRequestError } = require('../utils/errors');

const getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному id не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректно заполненные данные'));
      } if (err.code === 11000) {
        return next(new ConflictingRequestError('Пользователь с таким Email уже существует'));
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
        .send({ message: 'Вы успешно авторизовались' });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  const { JWT_SECRET } = process.env;
  try {
    res.clearCookie(JWT_SECRET).send({ message: 'Вы вышли из аккаунта' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyInfo, updateProfile, createUser, login, logout,
};
