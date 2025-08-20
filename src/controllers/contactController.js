const Contato = require('../models/ContatoModel');

exports.contact = function (req, res) {
    res.render('contato', {
        contato: {}
    });
}

exports.register = async function (req, res) {
    try {
        const contato = new Contato(req.body, req.session.login._id);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/index'));
            return;
        }

        req.flash('success', 'Seu contato foi cadastrado com sucesso');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.editIndex = async function (req, res) {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.findId(req.params.id);
    if (!contato) return res.render('404');

    res.render('contato', { contato });
};

exports.editContact = async function (req, res) {
    try {
        const contato = new Contato(req.body, req.session.login._id)
        await contato.edit(req.params.id);
        if(contato.errors.length > 0) {
        req.flash('errors', contato.errors)
        req.session.save(() => res.redirect(`/contato/index/${req.params.id}`))
        return;
        }   

        req.flash('success', 'Seu contato foi atualizado com sucesso');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}

