const { Client } = require('pg');
const dbClientConfig = require('../../config/db-client');

module.exports = async (req, res) => {
    const client = new Client(dbClientConfig);
    const queryString = `UPDATE users
    SET status=1
    WHERE id=${req.query.id}`;

    await client.connect();
    await client
        .query(queryString)
        .then(res.redirect('/ua/admin'))
        .catch((err) => {
            console.log(err);
            res.redirect('/ua/admin');
        });
    await client.end();
};
