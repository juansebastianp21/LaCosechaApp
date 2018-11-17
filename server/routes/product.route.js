const express = require('express');
const router = express.Router();

//invocacion de los controladores
const product_controller = require('../controllers/product.controller');

router.get('/test', product_controller.test);
router.post('/create', product_controller.product_create);

module.exports = router;