const express = require('express');
const ejs = require('ejs');
require('dotenv').config();

const app = express();

// EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Controllers
const homeController = require('./controllers/home');
const searchController = require('./controllers/search');
const searchPostController = require('./controllers/searchPost');
const productController = require('./controllers/product');
const notfoundController = require('./controllers/notfound');

// Routes
app.get('/', homeController);
app.get('/search', searchController);
app.post('/search', searchPostController);
app.get('/product/:id', productController);
app.get('/notfound', notfoundController);

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
