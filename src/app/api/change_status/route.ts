import { NextApiRequest, NextApiResponse} from 'next'
import login from '@/app/componets/scripts/login';
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
                let result = await login(sub_username, sub_password, 2);
                if (result.status == 1) {
                    await pool.getConnection();
                    let results = await pool.query('UPDATE requests SET status = '+sub_request_status+' WHERE id = '+sub_request_id+';')
                    if (results.err) {
                        status = 2
                    }
                    pool.end();
                }
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
