const express = require('express');
const router = express.Router();

// Routers
const userRouter = require('./en/userRouter');
const adminRouter = require('./en/adminRouter');
const indexRouter = require('./en/indexRouter');

// Routes
router.use('/', indexRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);

module.exports = router;
