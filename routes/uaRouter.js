const express = require('express');
const router = express.Router();

// Routers
const userRouter = require('./ua/userRouter');
const adminRouter = require('./ua/adminRouter');
const indexRouter = require('./ua/indexRouter');

// Routes
router.use('/', indexRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);

module.exports = router;
