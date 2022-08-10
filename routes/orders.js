var express = require('express');
var orderController = require('../controllers/order');
var { isAuth, isAdmin, isEmployee} = require('../middlewares/auth');
var router = express.Router();

/* GET orders listing. */
router.get('/', isAuth, orderController.getAll);
/* GET cart listing. */
router.get('/cart', isAuth, orderController.cart);
/* Get order by id. */
router.get('/:id', isAuth, orderController.getById);
/* Create order. */
router.post('/', isAuth, orderController.create);
/* Add to cart. */
router.post('/addToCart', isAuth, orderController.addToCart);
/* Remove from cart. */
router.put('/removeFromCart', isAuth, orderController.removeFromCart);
/* chackout */
router.put('/checkout', isAuth, orderController.checkout);
/* Update order. */
router.put('/status', isAuth, isEmployee, orderController.updateStatus);

module.exports = router;