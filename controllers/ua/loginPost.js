const passport = require('passport');

module.exports = passport.authenticate('local', {
    session: true,
    successRedirect: '/ua',
    failureRedirect: '/ua/user/login',
    failureFlash: true,
});
