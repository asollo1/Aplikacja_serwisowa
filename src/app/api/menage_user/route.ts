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
    let sub_user_id = body.user_id
    let sub_change_mode = body.change_mode
    try {
        switch (req.method) {
            case 'POST':
                let result = await login(sub_username, sub_password, 3);
                if (result.status == 1) {
                    await pool.getConnection();
                    let results;
                    switch (sub_change_mode) {
                        case 1:
                            results = await pool.query('UPDATE users SET password = "qwerty1234" WHERE id = '+sub_user_id+';')
                            break;
                        case 2:
                            results = await pool.query('DELETE FROM users WHERE id = '+sub_user_id+';')
                            break;
                        default:
                            status = 2;
                            break;
                    }
                    if (results.err) {
                        status = 2
                    }
                    pool.end();
                } else {
                    status = 2;
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
