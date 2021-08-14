const passport = require('passport');

module.exports = passport.authenticate('local', {
    session: true,
    successRedirect: '/en',
    failureRedirect: '/en/user/login',
    failureFlash: true,
});
