var express = require('express');
var productController = require('../controllers/product');
var { isAuth } = require('../middlewares/auth');

var { isAuth, isAdmin, isEmployee} = require('../middlewares/auth');

var router = express.Router();

/* GET products listing. */
router.get('/:category', productController.getAll);

router.get('/catalog/:category', productController.getAll);

// router.get('/cart', isAuth, userController.getCart);
/* Get product by id. */
router.get('/:id', productController.getById);
/* Create product. */
router.post('/', isAuth, isEmployee, productController.create);
/* Update product. */
router.put('/:id',isAuth, isEmployee, productController.update);
/* Delete product. */
router.delete('/:id',isAuth, isEmployee, productController.delete);

module.exports = router;
