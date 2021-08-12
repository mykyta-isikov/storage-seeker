const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('../../controllers/en/admin');
const adminApproveController = require('../../controllers/en/adminApprove');
const adminHoldController = require('../../controllers/en/adminHold');
const adminDeleteController = require('../../controllers/en/adminDelete');

// Middleware
const checkAuthAdmin = require('../../middleware/checkAuthAdmin');

router.get('/', checkAuthAdmin, adminController);
router.post('/approve', checkAuthAdmin, adminApproveController);
router.post('/hold', checkAuthAdmin, adminHoldController);
router.post('/delete', checkAuthAdmin, adminDeleteController);

module.exports = router;
