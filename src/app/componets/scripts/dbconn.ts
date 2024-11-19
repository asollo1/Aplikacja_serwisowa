import mysql from 'mysql'

export default function dbconn(){
    const pool = mysql.createConnection({
    host: 'localhost',
    user: 'serwis_app',
    password: 'test',
    database: "serwis_zse"  
    });
    return pool
};