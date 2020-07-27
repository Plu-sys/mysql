const mysql = require('mysql2/promise');
require('dotenv').config();

module.exports = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'shirs',
  password: 'Shirshak12',
  database: 'discordtest',
});
