const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/tasks', require('./task'));
router.get('/categories', require('../controllers').CategoryController.getAll);

module.exports = router;