import mysql from 'mysql'
import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
let id:any, username:any, password:any, user_type:any, status:any;
export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = mysql.createConnection({
        host: 'localhost',
        user: 'serwis_app',
        password: 'test',
        database: "serwis_zse"  
    });
    var body = await req.json();
    var sub_username = body.username
    var sub_password = body.password
    try {
        switch (req.method) {
            case 'POST':
                pool.connect();
                var x = pool.query('SELECT * FROM users WHERE username = "'+sub_username+'" AND password = "'+sub_password+'";', function (err, results) {
                    if (results.length > 0){
                        id = results[0].id; 
                        username = results[0].username; 
                        password = results[0].password; 
                        user_type = results[0].user_type;
                        status = 1
                    } else {
                        id = 0
                        username = ""
                        password = ""
                        user_type = 0
                        status = 2
                    }
                });
                pool.end();
                return NextResponse.json({
                    "id": id,
                    "username": username,
                    "password": password,
                    "user_type": user_type,
                    "status": status}, {status: 200});
                break;
            default:
                return NextResponse.json({ message: 'Method not allowed' }, {status: 405});
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
