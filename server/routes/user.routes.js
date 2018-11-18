const express = require('express');
const router = express.Router();

//invocacion de los controladores
const user_controller = require('../controllers/user.controller');

//Rutas para el login
router.post('/singup', user_controller.user_singup);
router.post('/login', user_controller.user_login)


module.exports = router;