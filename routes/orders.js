var express = require('express');
var orderController = require('../controllers/order');
var { isAuth, isAdmin, isEmployee} = require('../middlewares/auth');
var router = express.Router();

/* GET orders listing. */
router.get('/', isAuth, orderController.getAll);
router.get('/cart', isAuth, (req, res) => res.json({ cart: true }));
/* Get order by id. */
router.get('/:id', isAuth, orderController.getById);
/* Create order. */
router.post('/', isAuth, orderController.create);
/* Update order. */
router.put('/:id', isAuth, orderController.update);
/* Delete order. */
router.delete('/:id', isAuth, orderController.delete);

module.exports = router;