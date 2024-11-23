import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import dbconn from '@/app/componets/scripts/dbconn';
let status:any;
export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    let body = await req.json();
    let sub_username = body.username
    let sub_password = body.password
    let sub_request_id = body.request_id
    let sub_request_status = body.set_status
    try {
        switch (req.method) {
            case 'POST':
                pool.connect();
                pool.query('SELECT * FROM users WHERE username = "'+sub_username+'" AND password = "'+sub_password+'";', function (err, results) {
                    if (results[0].id != undefined) {
                        status = 1
                    } else {
                        status = 2
                    }
                });
                if (status == 1) {
                    pool.query('UPDATE requests SET status = '+sub_request_status+' WHERE id = '+sub_request_id+';', function(err, result){
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
