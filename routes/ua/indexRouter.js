const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('../../controllers/ua/home');
const searchController = require('../../controllers/ua/search');
const searchPostController = require('../../controllers/ua/searchPost');
const productController = require('../../controllers/ua/product');
const notfoundController = require('../../controllers/ua/notfound');

// Middleware
const checkAuthUser = require('../../middleware/checkAuthUser');

router.get('/', homeController);
router.get('/search', checkAuthUser, searchController);
router.post('/search', checkAuthUser, searchPostController);
router.get('/product', checkAuthUser, productController);
router.get('/notfound', checkAuthUser, notfoundController);

module.exports = router;
