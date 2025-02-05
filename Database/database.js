import mysql from 'mysql2';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'inaminam',
    database: 'recipe_db'
});

pool.getConnection((err, connection) => {
    if(err){
        console.error('error connecting:', err);
        process.exit(1);
    }
    console.log('connected to database!!!');
    connection.release();
});

export default pool;
