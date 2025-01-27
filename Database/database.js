const db = require('')
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'inaminam',
    database: 'recipes_db'
});