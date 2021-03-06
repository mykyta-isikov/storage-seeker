const { Client } = require('pg');
const dbClientConfig = require('../../config/db-client');

module.exports = async (req, res) => {
    const client = new Client(dbClientConfig);
    const queryString = `UPDATE users
    SET status=2
    WHERE id=${req.query.id}`;

    await client.connect();
    await client
        .query(queryString)
        .then(res.redirect('/en/admin'))
        .catch((err) => {
            console.log(err);
            res.redirect('/en/admin');
        });
    await client.end();
};
