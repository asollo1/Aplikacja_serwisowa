import dbconn from "./dbconn";
let id: number = 0, status: number = 0, user_type: number = 0, email: string = "";
export default async function login(username: string, password: string, user_type_req?: number){
    const pool = dbconn()
    pool.connect();
    if (user_type_req != null){
        await pool.query('SELECT * FROM users WHERE username = "'+username+'" AND password = "'+password+'" AND (user_type = '+user_type_req+' OR user_type = 3);', function (err: any, results:any) {
            if (results[0].id != undefined && results[0].user_type_req != results[0].user_type) {
                const user = results[0];
                id = user.id; 
                username = user.username; 
                password = user.password; 
                user_type = user.user_type;
                email = user.email;
                status = 1
            } else {
                id = 0
                username = ""
                password = ""
                user_type = 0
                email = ""
                status = 2
            }
        });
    } else {
        await pool.query('SELECT * FROM users WHERE username = "'+username+'" AND password = "'+password+'";', function (err: any, results:any) {
            if (results[0].id != undefined) {
                const user = results[0];
                id = user.id; 
                username = user.username; 
                password = user.password; 
                user_type = user.user_type;
                email = user.email;
                status = 1
            } else {
                id = 0
                username = ""
                password = ""
                user_type = 0
                email = ""
                status = 2
            }
        });
    }
    pool.end();
    return {id, user_type, username, password, status, email}
}