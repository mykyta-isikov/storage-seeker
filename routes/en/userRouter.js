const express = require('express');
const router = express.Router();

// Controllers
const loginController = require('../../controllers/en/login');
const loginPostController = require('../../controllers/en/loginPost');
const registerController = require('../../controllers/en/register');
const registerPostController = require('../../controllers/en/registerPost');
const logoutController = require('../../controllers/en/logout');

// Middleware
const checkAuth = require('../../middleware/checkAuth');
const checkNotAuthenticated = require('../../middleware/checkNotAuthenticated');

router.get('/login', checkNotAuthenticated, loginController);
router.post('/login', checkNotAuthenticated, loginPostController);
router.get('/register', checkNotAuthenticated, registerController);
router.post('/register', checkNotAuthenticated, registerPostController);
router.get('/logout', checkAuth, logoutController);

module.exports = router;
