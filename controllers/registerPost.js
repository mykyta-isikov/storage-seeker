const { Client } = require('pg');
const dbClientConfig = require('../config/db-client');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const client = new Client(dbClientConfig);
    await client.connect();

    if (await checkUniqueEmail(req.body.email)) {
        if (req.body.password !== req.body.repeat_password) {
            console.log("Passwords don't match");
            res.redirect('/register');
            return;
        }

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const queryString = `INSERT INTO users 
        (email, last_name, first_name, password, status) 
        VALUES (
            \'${req.body.email}\', 
            \'${req.body.last_name}\', 
            \'${req.body.first_name}\', 
            \'${hashedPassword}\', 
            1
        )`;
        console.log(queryString);

        await client
            .query(queryString)
            .then((queryResult) => {
                console.log(queryResult);
                res.redirect('/login');
            })
            .catch((err) => console.log(err));
    } else {
        res.redirect('/register');
    }

    async function checkUniqueEmail(email) {
        let output = false;
        await client
            .query(`SELECT email FROM users WHERE email='${email}'`)
            .then((queryResult) => {
                if (queryResult.rows[0]) {
                    console.log('User with this email already exists');
                } else {
                    output = true;
                }
            })
            .catch((err) => console.log(err));

        return output;
    }
};
