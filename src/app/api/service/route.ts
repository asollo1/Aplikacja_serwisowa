import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import login from '@/app/componets/scripts/login';
import dbconn from '@/app/componets/scripts/dbconn'
let response: string = "", status:number = 1;

export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    let body = await req.json();
    let sub_username = body.username
    let sub_password = body.password
    try {
        switch (req.method) {
            case 'POST':
                let result = await login(sub_username, sub_password, 2);
                if (result.status == 1){
                    pool.connect();
                    pool.query('SELECT ROW_NUMBER() OVER (ORDER BY requests.status) AS row_num, requests.id, requests.description, requests.date_of_request, requests.status, users.username, requests.class FROM requests JOIN users ON requests.user_id = users.id ORDER BY requests.status;', function (err, results){
                        response = results
                    });
                    pool.end();
                }
                return NextResponse.json({
                    response,
                    }, {status: 200});
                break;
            default:
                return NextResponse.json({ message: 'Method not allowed' }, {status: 405});
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
