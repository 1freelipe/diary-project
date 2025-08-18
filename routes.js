const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController')

// Rotas da home
route.get('/index', homeController.index);

// Rotas de login
route.get('/login/index', loginController.indexLogin);
route.post('/login/initial', loginController.loginInitial);
route.post('/login/register', loginController.loginRegister);
route.get('/login/logout', loginController.loginLogout);
route.get('/contatos', contactController.contact);

module.exports = route;