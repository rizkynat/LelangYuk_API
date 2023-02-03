const { error } = require('console');
const mysql = require('mysql');
const { resolve } = require('path');



// Configuration connection
const options = {
    connectionLimit: process.env.CONNECTION_LIMIT,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    createDatabaseTable: true

}

const pool = mysql.createPool(options);



module.exports = pool