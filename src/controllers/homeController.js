const Contato = require('../models/ContatoModel');

exports.index = async function (req, res) {
    try {
        if (!req.session.login) {
            res.render('index')
        } else {
            const contatos = await Contato.find(req.session.login._id)
            res.render('index', { user: req.session.login, contatos });
        }
    } catch (e) {
        console.log(e);
    }
};

