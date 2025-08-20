const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController')

// Middleware
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/index', homeController.index);

// Rotas de login
route.get('/login/index', loginController.indexLogin);
route.post('/login/initial', loginController.loginInitial);
route.post('/login/register', loginController.loginRegister);
route.get('/login/logout', loginController.loginLogout);

// Rotas de contato
route.get('/contato/index', loginRequired, contactController.contact);
route.post('/contato/register', loginRequired, contactController.register);
route.get('/contato/index/:id', loginRequired, contactController.editIndex);
route.post('/contato/edit/:id', loginRequired, contactController.editContact);

module.exports = route;