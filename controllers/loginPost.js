const passport = require('passport');

module.exports = passport.authenticate('local', {
    session: true,
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true,
});
