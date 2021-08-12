const express = require('express');
const router = express.Router();

// Controllers
const loginController = require('../../controllers/ua/login');
const loginPostController = require('../../controllers/ua/loginPost');
const registerController = require('../../controllers/ua/register');
const registerPostController = require('../../controllers/ua/registerPost');
const logoutController = require('../../controllers/ua/logout');

// Middleware
const checkAuth = require('../../middleware/checkAuth');
const checkNotAuthenticated = require('../../middleware/checkNotAuthenticated');

router.get('/login', checkNotAuthenticated, loginController);
router.post('/login', checkNotAuthenticated, loginPostController);
router.get('/register', checkNotAuthenticated, registerController);
router.post('/register', checkNotAuthenticated, registerPostController);
router.get('/logout', checkAuth, logoutController);

module.exports = router;
