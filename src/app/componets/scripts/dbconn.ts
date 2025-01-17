const mariadb = require('mariadb');
export default function dbconn(){
    const pool = mariadb.createPool({
        host: 'localhost',
        user: 'serwis_app',
        password: 'test',
        database: "serwis_zse"  
    });
    return pool
};