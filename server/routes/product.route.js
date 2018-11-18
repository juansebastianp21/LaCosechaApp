const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

//invocacion de los controladores
const product_controller = require('../controllers/product.controller');

//Rutas para realizar CRUD de los productos 
router.get('/',  product_controller.product_list);
router.post('/create', checkAuth, product_controller.product_create);
router.get('/:id', checkAuth, product_controller.product_details);
router.put('/:id/update', checkAuth, product_controller.product_update);
router.delete('/:id/delete', checkAuth, product_controller.product_delete);





module.exports = router;