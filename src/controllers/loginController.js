const Login = require('../models/loginModel');

exports.indexLogin = (req, res) => {
    if (req.session.login) return res.render('loginInitial');
    return res.render('login')
}

exports.loginInitial = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.login();

        // Logando o erro na tela
        if (login.errors.length > 0) {
            // Exibindo o erro com as flashs messages
            req.flash('errors', login.errors);
            // Salvando a sessão para redirecionar a página
            req.session.save(function () {
                // Redirecionando a página para onde ela veio, caso dê algum erro
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', 'Usuário logado com sucesso');
        req.session.login = { 
            _id: login.user._id,
            nome: login.user.nome,
            email: login.user.email
        };
        
        req.session.save(function () {
            return res.redirect('/login/index');
        })

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.loginRegister = async function (req, res) {

    try {
        const login = new Login(req.body);
        await login.register();

        // Logando o erro na tela
        if (login.errors.length > 0) {
            // Exibindo o erro com as flashs messages
            req.flash('errors', login.errors);
            // Salvando a sessão para redirecionar a página
            req.session.save(function () {
                // Redirecionando a página para onde ela veio, caso dê algum erro
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso');
        req.session.save(function () {
            return res.redirect('/login/index');
        })

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}


exports.loginLogout = function (req, res) {
    req.session.destroy();
    res.redirect('/index');
};