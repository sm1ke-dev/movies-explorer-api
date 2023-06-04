const router = require('express').Router();

router.use(require('./users'));
router.use(require('./movies'));
router.use(require('./404'));

module.exports = router;
