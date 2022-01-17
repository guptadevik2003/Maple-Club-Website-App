module.exports.isAuth = async (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports.isNotAuth = async (req, res, next) => {
    if (req.session.isAuth) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

module.exports.isDev = async (req, res, next) => {
    if (req.session.isDev) {
        next()
    } else {
        res.redirect('/dashboard')
    }
}
