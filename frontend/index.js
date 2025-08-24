import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import Contact from './modules/Contact';

import './assets/css/styles.css';

// Formulários de login
const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

// Formulários de contato
const contact = new Contact('.form-contact');

login.init();
cadastro.init();
contact.init();