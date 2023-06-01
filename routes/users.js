const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMyInfo, updateProfile } = require('../controllers/users');

router.get('/me', getMyInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
}), updateProfile);

module.exports = router;
