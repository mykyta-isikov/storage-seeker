const { Client } = require('pg');
const dbClientConfig = require('../config/db-client');

module.exports = async (req, res) => {
    const client = new Client(dbClientConfig);
    const queryString = `DELETE FROM users
    WHERE id=${req.query.id}`;

    await client.connect();
    await client
        .query(queryString)
        .then(res.redirect('/admin'))
        .catch((err) => {
            console.log(err);
            res.redirect('/admin');
        });
    await client.end();
};
