const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/tasks', require('./task'));

module.exports = router;