const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('../controllers/admin');
const adminApproveController = require('../controllers/adminApprove');
const adminHoldController = require('../controllers/adminHold');
const adminDeleteController = require('../controllers/adminDelete');

// Middleware
const checkAuthAdmin = require('../middleware/checkAuthAdmin');

router.get('/', checkAuthAdmin, adminController);
router.post('/approve', checkAuthAdmin, adminApproveController);
router.post('/hold', checkAuthAdmin, adminHoldController);
router.post('/delete', checkAuthAdmin, adminDeleteController);

module.exports = router;
