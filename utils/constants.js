const REGEX_URL = /https?:\/\/w?w?w?\.?\S+\.\w{2,10}\/?\S*/;

const BAD_REQUEST = 'Некорректно заполненные данные';
const FILM_NOT_FOUND = 'Фильм с указанным id не найден';
const USER_NOT_FOUND = 'Пользователь по указанному id не найден';
const PAGE_NOT_FOUND = 'Страница не найдена';
const TOKEN_NOT_FOUND = 'Токен не найден';
const UNAUTHORIZED_ERR = 'Необходима авторизация';
const WRONG_DATA = 'Неправильные почта или пароль';
const SAME_EMAIL = 'Пользователь с таким Email уже существует';
const FORBIDDEN_ERR = 'Вы не можете удалить чужой фильм';
const INVALID_LINK = 'Invalid link';

const SERVER_ERR = 'На сервере произошла ошибка';
const AUTH_SUCCESS = 'Вы успешно авторизовались';
const LEAVED_ACCOUNT = 'Вы вышли из аккаунта';

module.exports = {
  REGEX_URL,
  BAD_REQUEST,
  FILM_NOT_FOUND,
  USER_NOT_FOUND,
  PAGE_NOT_FOUND,
  TOKEN_NOT_FOUND,
  UNAUTHORIZED_ERR,
  WRONG_DATA,
  SAME_EMAIL,
  FORBIDDEN_ERR,
  INVALID_LINK,
  SERVER_ERR,
  AUTH_SUCCESS,
  LEAVED_ACCOUNT,
};
