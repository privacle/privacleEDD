'use strict';
const pgp = require('pg-promise')({
    // Initialization Options
});
const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

const db = pgp(cn);
