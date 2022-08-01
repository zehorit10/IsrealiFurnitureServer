var express = require('express');
var orderController = require('../controllers/order');

var router = express.Router();

/* GET orders listing. */
router.get('/', orderController.getAll);
/* Get order by id. */
router.get('/:id', orderController.getById);
/* Create order. */
router.post('/', orderController.create);
/* Update order. */
router.put('/:id', orderController.update);
/* Delete order. */
router.delete('/:id', orderController.delete);

module.exports = router;