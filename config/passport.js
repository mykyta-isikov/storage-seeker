const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const dbClientConfig = require('./db-client');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                const client = new Client(dbClientConfig);
                const queryString =
                    "SELECT * FROM users WHERE email='" + email + "'";

                await client.connect();
                client.query(queryString, (err, queryResult) => {
                    if (err) {
                        console.log(err);
                        return done(null, false, {
                            message: '1',
                        });
                    } else {
                        // Does the user exist in DB?
                        if (queryResult.rows[0]) {
                            const user = queryResult.rows[0];

                            // Do the passwords match?
                            bcrypt.compare(
                                password,
                                user.password,
                                (err, isMatch) => {
                                    if (err) throw err;
                                    if (isMatch) {
                                        return done(null, user);
                                    } else {
                                        return done(null, false, {
                                            message: '2',
                                        });
                                    }
                                },
                            );
                        } else {
                            return done(null, false, {
                                message: '3',
                            });
                        }
                    }
                    client.end();
                });
            },
        ),
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const client = new Client(dbClientConfig);
        const queryString = 'SELECT * FROM users WHERE id = ' + id;

        await client.connect();
        client.query(queryString, (err, queryResult) => {
            done(err, queryResult.rows[0]);
            client.end();
        });
    });
};
