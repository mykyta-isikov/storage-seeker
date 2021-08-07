const { Client } = require('pg');
const dbClientConfig = require('../config/db-client');
const JoiSchema = require('../config/joi');

module.exports = async (req, res) => {
    try {
        const value = await JoiSchema.validateAsync(req.body);

        if (
            req.body.name == '' &&
            req.body.price_min == '' &&
            req.body.price_max == '' &&
            req.body.id == ''
        ) {
            res.redirect('/search');
        } else {
            search();
        }
    } catch (err) {
        console.log(err);
        res.redirect('/search');
    }

    function search() {
        if (req.body.id) {
            console.log('Searching by id');
            executeQuery(
                req.body.only_in_stock,
                'SELECT * FROM products WHERE code = ' + req.body.id,
            );
        } else if (req.body.name && req.body.price_min && req.body.price_max) {
            console.log('Searching by name and price range');
            executeQuery(
                req.body.only_in_stock,
                "SELECT * FROM products WHERE LOWER(name) LIKE LOWER('%" +
                    req.body.name +
                    "%') AND retail_price BETWEEN " +
                    req.body.price_min +
                    ' AND ' +
                    req.body.price_max,
            );
        } else if (req.body.name && req.body.price_min) {
            console.log('Searching by name and min-price');
            executeQuery(
                req.body.only_in_stock,
                "SELECT * FROM products WHERE LOWER(name) LIKE LOWER('%" +
                    req.body.name +
                    "%') AND retail_price >= " +
                    req.body.price_min,
            );
        } else if (req.body.name && req.body.price_max) {
            console.log('Searching by name and max-price');
            executeQuery(
                req.body.only_in_stock,
                "SELECT * FROM products WHERE LOWER(name) LIKE LOWER('%" +
                    req.body.name +
                    "%') AND retail_price <= " +
                    req.body.price_max,
            );
        } else if (req.body.name) {
            console.log('Searching by name');
            executeQuery(
                req.body.only_in_stock,
                "SELECT * FROM products WHERE LOWER(name) LIKE LOWER('%" +
                    req.body.name +
                    "%')",
            );
        } else if (req.body.price_min && req.body.price_max) {
            console.log('Searching by price range');
            executeQuery(
                req.body.only_in_stock,
                'SELECT * FROM products WHERE retail_price BETWEEN ' +
                    req.body.price_min +
                    ' AND ' +
                    req.body.price_max,
            );
        } else if (req.body.price_min) {
            console.log('Searching by min-price');
            executeQuery(
                req.body.only_in_stock,
                'SELECT * FROM products WHERE retail_price >= ' +
                    req.body.price_min,
            );
        } else if (req.body.price_max) {
            console.log('Searching by max-price');
            executeQuery(
                req.body.only_in_stock,
                'SELECT * FROM products WHERE retail_price <= ' +
                    req.body.price_max,
            );
        } else {
            res.redirect('/search');
        }
    }

    async function executeQuery(onlyInStock, queryString) {
        if (onlyInStock) queryString += ' AND qty > 0';

        const client = new Client(dbClientConfig);

        await client.connect();
        client.query(queryString, (err, queryResult) => {
            if (err) console.log(err);
            if (!err) {
                if (queryResult.rows.length === 1) {
                    res.redirect('/product?code=' + queryResult.rows[0].code);
                } else if (queryResult.rows.length === 0) {
                    res.redirect('/notfound');
                } else {
                    res.render('pages/searchResults', {
                        searchResults: queryResult.rows,
                    });
                }
            }
            client.end();
        });
    }
};
