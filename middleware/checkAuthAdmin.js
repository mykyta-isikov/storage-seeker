module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.status >= 3) {
            return next();
        }
    }

    res.redirect('/');
};
