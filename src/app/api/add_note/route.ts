import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import dbconn from '@/app/componets/scripts/dbconn';
import login from '@/app/componets/scripts/login';
let status:number = 1;
export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    let body = await req.json();
    let sub_username = body.username
    let sub_password = body.password
    let sub_note = body.note
    let sub_service_request_id = body.service_request_id
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2,'0');
    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');
    let cur_date = `${hour}:${minute} ${day}.${month}.${year}`
    try {
        switch (req.method) {
            case 'POST':
                await pool.getConnection();
                let result = await login(sub_username, sub_password, 2);
                if (result.status == 1) {
                    let results = await pool.query(`INSERT INTO notes (note, user_id, req_id, date) VALUES ("${sub_note}", "${result.id}", "${sub_service_request_id}", "${cur_date}")`);
                    if (results.err) {
                        status = 2
                    }
                } else {
                    status = 2;
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
