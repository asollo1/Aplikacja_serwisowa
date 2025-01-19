import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import dbconn from '@/app/componets/scripts/dbconn';
import login from '@/app/componets/scripts/login';
let status:any = 1;
export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    let body = await req.json();
    let sub_username = body.username
    let sub_password = body.password
    let sub_email = body.email
    var sub_old_password = body.old_password
    try {
        switch (req.method) {
            case 'POST':
                let result = await login(sub_username, sub_old_password);
                if (result.status == 1) {
                    await pool.getConnection();
                    let results = await pool.query('UPDATE users SET password = "'+sub_password+'", email = "'+sub_email+'" WHERE username = "'+sub_username+'";')
                    if (results.err) {
                        status = 2
                    }
                    pool.end();
                } else {
                    status = 2;
                }
                return NextResponse.json({
                    "password": sub_password,
                    "username": sub_username,
                    "email": sub_email,
                    "status": status
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
