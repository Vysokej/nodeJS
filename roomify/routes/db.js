const mysql = require("mysql2/promise");
require('dotenv').config();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.ROOT_PASSWORD,
    database: "roomify"
});

module.exports = db;