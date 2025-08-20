exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.login;
    next();
}


exports.checkCSRFerror = (err, req, res, next) => {
    if (err)
        return res.render('404')

    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if (!req.session.login) {
        req.flash('errors', 'Você precisa fazer login antes de acessar essa página');
        req.session.save(() => res.redirect('/login/index'));
        return;
    }

    next();
}