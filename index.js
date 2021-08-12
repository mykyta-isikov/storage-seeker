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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
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

// Controllers
const homeController = require('./controllers/home');
const searchController = require('./controllers/search');
const searchPostController = require('./controllers/searchPost');
const productController = require('./controllers/product');
const notfoundController = require('./controllers/notfound');
const loginController = require('./controllers/login');
const loginPostController = require('./controllers/loginPost');
const registerController = require('./controllers/register');
const registerPostController = require('./controllers/registerPost');
const logoutController = require('./controllers/logout');
const adminController = require('./controllers/admin');
const adminApproveController = require('./controllers/adminApprove');
const adminHoldController = require('./controllers/adminHold');
const adminDeleteController = require('./controllers/adminDelete');

// Routes
app.get('/', homeController);
app.get('/search', checkAuthUser, searchController);
app.post('/search', checkAuthUser, searchPostController);
app.get('/product', checkAuthUser, productController);
app.get('/notfound', checkAuthUser, notfoundController);
app.get('/login', checkNotAuthenticated, loginController);
app.post('/login', checkNotAuthenticated, loginPostController);
app.get('/register', checkNotAuthenticated, registerController);
app.post('/register', checkNotAuthenticated, registerPostController);
app.get('/logout', checkAuth, logoutController);
app.get('/admin', checkAuthAdmin, adminController);
app.post('/admin/approve', checkAuthAdmin, adminApproveController);
app.post('/admin/hold', checkAuthAdmin, adminHoldController);
app.post('/admin/delete', checkAuthAdmin, adminDeleteController);

app.use((req, res) => {
    res.status(404).render('pages/404');
});
app.use((err, req, res, next) => {
    res.status(500).render('pages/500');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}...`);
});

// Passport functions
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function checkAuthUser(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.status >= 2) {
            return next();
        }
    }

    res.redirect('/');
}

function checkAuthAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.status >= 3) {
            return next();
        }
    }

    res.redirect('/');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    next();
}
