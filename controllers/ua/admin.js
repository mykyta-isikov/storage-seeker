const { Client } = require('pg');
const dbClientConfig = require('../../config/db-client');

module.exports = async (req, res) => {
    const client = new Client(dbClientConfig);
    const queryString = `SELECT id, last_name, first_name, status 
    FROM users 
    WHERE status<3
    ORDER BY last_name ASC`;

    await client.connect();
    await client
        .query(queryString)
        .then((queryResult) => {
            res.render('pages/ua/admin', {
                users: queryResult.rows,
            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/ua');
        });
    await client.end();
};
