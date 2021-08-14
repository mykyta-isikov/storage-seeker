const { Client } = require('pg');
const dbClientConfig = require('../../config/db-client');
const bcrypt = require('bcrypt');
const JoiSchema = require('../../config/joi/register-en');

module.exports = async (req, res) => {
    try {
        await JoiSchema.validateAsync(req.body);

        if (req.body.password.trim() !== req.body.repeat_password.trim()) {
            req.flash('error', 'Passwords should be identical');
            res.redirect('/en/user/register');
        } else {
            const client = new Client(dbClientConfig);
            await client.connect();

            if (await checkUniqueEmail(client, req.body.email)) {
                const salt = await bcrypt.genSalt(
                    parseInt(process.env.SALT_ROUNDS),
                );
                const hashedPassword = await bcrypt.hash(
                    req.body.password.trim(),
                    salt,
                );
                const queryString = `INSERT INTO users 
                (email, last_name, first_name, password, status) 
                VALUES (
                    \'${req.body.email.trim()}\', 
                    \'${req.body.last_name.trim()}\', 
                    \'${req.body.first_name.trim()}\', 
                    \'${hashedPassword}\', 
                    1
                )`;

                await client
                    .query(queryString)
                    .then((queryResult) => {
                        res.redirect('/en/user/login');
                    })
                    .catch((err) => console.log(err));
            } else {
                req.flash('error', 'This email is already signed up');
                res.redirect('/en/user/register');
            }

            client.end();
        }
    } catch (err) {
        req.flash('error', err.message);
        console.log(err.message);
        res.redirect('/en/user/register');
    }

    async function checkUniqueEmail(client, email) {
        let output = false;
        await client
            .query(`SELECT email FROM users WHERE email='${email}'`)
            .then((queryResult) => {
                if (queryResult.rows[0]) {
                } else {
                    output = true;
                }
            })
            .catch((err) => console.log(err));

        return output;
    }
};
