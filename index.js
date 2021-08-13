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
const uaRouter = require('./routes/uaRouter');
const enRouter = require('./routes/enRouter');

// Routes
app.get('/', (req, res) => res.redirect('/ua'));
app.use('/ua', uaRouter);
app.use('/en', enRouter);

// Error handlers
app.use((req, res) => res.status(404).render('pages/en/404'));
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).render('pages/en/500');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}...`);
});
