const { Client } = require('pg');
const dbClientConfig = require('../config/db-client');

module.exports = async (req, res) => {
    const client = new Client(dbClientConfig);

    await client.connect();
    const query_string =
        'SELECT * FROM products WHERE code = ' + req.query.code;
    client.query(query_string, (err, query_result) => {
        if (err) console.log(err);
        if (!err) {
            if (query_result.rows[0]) {
                res.render('pages/product', {
                    product: query_result.rows[0],
                });
            } else {
                res.redirect('/notfound');
            }
        }
        client.end();
    });
};
