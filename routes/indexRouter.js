const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('../controllers/home');
const searchController = require('../controllers/search');
const searchPostController = require('../controllers/searchPost');
const productController = require('../controllers/product');
const notfoundController = require('../controllers/notfound');

// Middleware
const checkAuthUser = require('../middleware/checkAuthUser');

router.get('/', homeController);
router.get('/search', checkAuthUser, searchController);
router.post('/search', checkAuthUser, searchPostController);
router.get('/product', checkAuthUser, productController);
router.get('/notfound', checkAuthUser, notfoundController);

module.exports = router;
