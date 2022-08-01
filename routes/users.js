var express = require('express');
var userController = require('../controllers/user');

var router = express.Router();

/* GET users listing. */
router.get('/', userController.getAll);
/* Get user by id. */
router.get('/:id', userController.getById);
/* Create user. */
router.post('/', userController.create);
/* Update user. */
router.put('/:id', userController.update);
/* Delete user. */
router.delete('/:id', userController.delete);


module.exports = router;
