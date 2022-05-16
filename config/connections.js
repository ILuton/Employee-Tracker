const mysql = require('mysql2')
require('dotenv').config();

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_db',
    password: 'password'
  });

module.exports = database;
