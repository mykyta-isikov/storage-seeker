const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
require('dotenv').config();

const app = express();

// EJS
app.set('view engine', 'ejs');

// Passport config
require('./config/passport')(passport);

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
    }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routers
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const indexRouter = require('./routes/indexRouter');

// Routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.use((req, res) => res.status(404).render('pages/404'));
app.use((err, req, res, next) => res.status(500).render('pages/500'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}...`);
});
