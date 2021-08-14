module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.status >= 2) {
            return next();
        }
    }

    res.redirect('/');
};
