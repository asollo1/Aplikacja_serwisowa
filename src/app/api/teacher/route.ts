import dbconn from '@/app/componets/scripts/dbconn';
import login from '@/app/componets/scripts/login';
import mysql from 'mysql'
import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
let response: string = "";

export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn()
    let body = await req.json();
    let sub_username = body.username
    let sub_password = body.password
    try {
        switch (req.method) {
            case 'POST':
                let result = await login(sub_username, sub_password);
                if (result.status == 1){
                    await pool.getConnection();
                    response = await pool.query(`SELECT requests.id, requests.description, requests.date_of_request, requests.status, requests.class, users.username FROM requests JOIN users ON requests.user_id = users.id WHERE user_id='${result.id}' ORDER BY requests.status;`)
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
