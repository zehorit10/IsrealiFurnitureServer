var express = require('express');
var productController = require('../controllers/product');

var router = express.Router();

/* GET products listing. */
router.get('/:category', productController.getAll);

router.get('/catalog/:category', productController.getAll);
/* Get product by id. */
router.get('/:id', productController.getById);
/* Create product. */
router.post('/', productController.create);
/* Update product. */
router.put('/:id', productController.update);
/* Delete product. */
router.delete('/:id', productController.delete);

module.exports = router;
