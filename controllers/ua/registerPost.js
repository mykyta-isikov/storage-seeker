const { Client } = require('pg');
const dbClientConfig = require('../../config/db-client');
const bcrypt = require('bcrypt');
const JoiSchema = require('../../config/joi/register-ua');

module.exports = async (req, res) => {
    try {
        await JoiSchema.validateAsync(req.body);

        if (req.body.password.trim() !== req.body.repeat_password.trim()) {
            req.flash('error', 'Паролі мають збігатись');
            res.redirect('/ua/user/register');
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
                        res.redirect('/ua/user/login');
                    })
                    .catch((err) => console.log(err));
            } else {
                req.flash(
                    'error',
                    'Користувач з цією ел. поштою вже зареєстрований',
                );
                res.redirect('/ua/user/register');
            }

            client.end();
        }
    } catch (err) {
        req.flash('error', err.message);
        console.log(err.message);
        res.redirect('/ua/user/register');
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
