const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUserVal, loginVal, updateProfileVal } = require('../middlewares/validation');
const {
  createUser, login, logout, getMyInfo, updateProfile,
} = require('../controllers/users');

router.post('/signup', createUserVal, createUser);
router.post('/signin', loginVal, login);
router.post('/signout', auth, logout);

router.get('/users/me', auth, getMyInfo);
router.patch('/users/me', auth, updateProfileVal, updateProfile);

module.exports = router;
