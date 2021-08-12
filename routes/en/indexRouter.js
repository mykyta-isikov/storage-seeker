const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('../../controllers/en/home');
const searchController = require('../../controllers/en/search');
const searchPostController = require('../../controllers/en/searchPost');
const productController = require('../../controllers/en/product');
const notfoundController = require('../../controllers/en/notfound');

// Middleware
const checkAuthUser = require('../../middleware/checkAuthUser');

router.get('/', homeController);
router.get('/search', checkAuthUser, searchController);
router.post('/search', checkAuthUser, searchPostController);
router.get('/product', checkAuthUser, productController);
router.get('/notfound', checkAuthUser, notfoundController);

module.exports = router;
