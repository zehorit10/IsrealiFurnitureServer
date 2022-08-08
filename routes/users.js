var express = require('express');
var userController = require('../controllers/user');
var { isAuth, isAdmin, isEmployee} = require('../middlewares/auth');

var router = express.Router();

/* GET users listing. */
router.get('/', isAuth, isEmployee, userController.getAll);

router.get('/profile', isAuth, userController.getProfile);
/* Get user by id. */
router.get('/:id',isAuth, isEmployee, userController.getById);
/* Create user. */
router.post('/',isAuth, isAdmin, userController.create);
router.put('/profile',isAuth, userController.updateProfile);
/* Update user. */
router.put('/:id',isAuth, isAdmin, userController.update);
/* Delete user. */
router.delete('/:id',isAuth, isAdmin, userController.delete);


module.exports = router;
