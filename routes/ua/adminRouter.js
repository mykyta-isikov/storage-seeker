const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('../../controllers/ua/admin');
const adminApproveController = require('../../controllers/ua/adminApprove');
const adminHoldController = require('../../controllers/ua/adminHold');
const adminDeleteController = require('../../controllers/ua/adminDelete');

// Middleware
const checkAuthAdmin = require('../../middleware/checkAuthAdmin');

router.get('/', checkAuthAdmin, adminController);
router.post('/approve', checkAuthAdmin, adminApproveController);
router.post('/hold', checkAuthAdmin, adminHoldController);
router.post('/delete', checkAuthAdmin, adminDeleteController);

module.exports = router;
