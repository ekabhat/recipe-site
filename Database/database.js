import mysql from 'mysql2';
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'inaminam',
    database: 'recipe_db'
});

db.connect((err) => {
    if(err){
        console.error('error connecting:', err);
        process.exit(1);
    }
    console.log('connected to database!!!');
});

export default db;
