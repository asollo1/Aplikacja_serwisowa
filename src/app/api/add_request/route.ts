import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import dbconn from '@/app/componets/scripts/dbconn';
let status:any, user_id:any;
export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    var body = await req.json();
    var sub_username = body.username
    var sub_password = body.password
    var sub_description = body.description
    var sub_room_number = body.room_number
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2,'0');

    const formattedDate = `${year}-${month}-${day}`;
    try {
        switch (req.method) {
            case 'POST':
                pool.connect();
                pool.query('SELECT * FROM users WHERE username = "'+sub_username+'" AND password = "'+sub_password+'";', function (err, results) {
                    if (results[0].id != undefined) {
                        user_id = results[0].id;
                        status = 1
                    } else {
                        status = 2
                    }
                });
                if (status == 1 && user_id != null) {
                    pool.query('INSERT INTO requests(user_id, description, status, date_of_request, class) VALUES ('+user_id+', "'+sub_description+'", 1, "'+formattedDate+'", '+sub_room_number+');', function(err, result){
                        console.log(err);
                        console.log(result);
                        if (err) {
                            status = 2
                        }
                    });
                }
                pool.end();
                return NextResponse.json({"status": status}, {status: 200});
                break;
            default:
                return NextResponse.json({ message: 'Method not allowed' }, {status: 405});
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
