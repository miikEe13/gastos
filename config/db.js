// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

// Establish a connection to the MySQL database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database and handle errors
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('✅ Successfully connected to the MySQL database');
});

module.exports = connection;
