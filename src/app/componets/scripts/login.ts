import dbconn from "./dbconn";
let id: number = 0, status: number = 0, user_type: number = 0, email: string = "";
export default async function login(username: string, password: string, user_type_req?: number){
    const pool = dbconn()
    await pool.getConnection();
    if (user_type_req != null){
        let results = await pool.query('SELECT * FROM users WHERE username = "'+username+'" AND password = "'+password+'" AND (user_type = '+user_type_req+' OR user_type = 3);');
        if (results.lenght != 0 && results[0].user_type_req != results[0].user_type) {
            id = results[0].id; 
            username = results[0].username; 
            password = results[0].password; 
            user_type = results[0].user_type;
            email = results[0].email;
            status = 1
        } else {
            id = 0
            username = ""
            password = ""
            user_type = 0
            email = ""
            status = 2
        }
    } else {
        let results = await pool.query('SELECT * FROM users WHERE username = "'+username+'" AND password = "'+password+'";')
        if (results.length != 0) {
            id = results[0].id; 
            username = results[0].username; 
            password = results[0].password; 
            user_type = results[0].user_type;
            email = results[0].email;
            status = 1
        } else {
            id = 0
            username = ""
            password = ""
            user_type = 0
            email = ""
            status = 2
        }
    }
    pool.end();
    return {id, user_type, username, password, status, email}
}