const { Client } = require('pg');
const dbClientConfig = require('../config/db-client');
const JoiSchema = require('../config/joi/search');

module.exports = async (req, res) => {
    try {
        await JoiSchema.validateAsync(req.body);

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

    async function search() {
        let queryString = 'SELECT * FROM products WHERE';

        if (req.body.id) {
            // Search by id
            queryString += ` code=${req.body.id}`;
        } else if (req.body.name || req.body.price_min || req.body.price_max) {
            // Search by name and/or price
            if (req.body.name) {
                queryString += ` LOWER(name) LIKE LOWER('%${req.body.name}%')`;

                if (req.body.price_min || req.body.price_max) {
                    queryString += ` AND`;
                }
            }

            if (req.body.price_min && req.body.price_max) {
                queryString += ` retail_price BETWEEN ${req.body.price_min} AND ${req.body.price_max}`;
            } else if (req.body.price_min) {
                queryString += ` retail_price>=${req.body.price_min}`;
            } else if (req.body.price_max) {
                queryString += ` retail_price<=${req.body.price_max}`;
            }

            if (req.body.only_in_stock) {
                queryString += ` AND qty>0`;
            }
        }

        // Execute query
        const client = new Client(dbClientConfig);

        await client.connect();
        await client
            .query(queryString)
            .then((queryResult) => {
                if (queryResult.rows.length === 1) {
                    res.redirect('/product?code=' + queryResult.rows[0].code);
                } else if (queryResult.rows.length === 0) {
                    res.redirect('/notfound');
                } else {
                    res.render('pages/searchResults', {
                        searchResults: queryResult.rows,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        await client.end();
    }
};
