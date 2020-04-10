const router              = require('express').Router();
const { TaskController }  = require('../controllers');
const { authentication, authorization }  = require('../middlewares');

router.use(authentication); //midlewares authentication
router.get('/', TaskController.getAll);
router.post('/', TaskController.create);
router.get('/:id', TaskController.getOne);
router.put('/:id', authorization, TaskController.updateOne);
router.delete('/:id', authorization, TaskController.deleteOne);

module.exports = router