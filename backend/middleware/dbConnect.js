const mysql = require('mysql');
require('dotenv').config()
const dbConfig = require("./db.config.js");

const pool = mysql.createConnection({
    connectionLimit: 10,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

pool.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = pool;