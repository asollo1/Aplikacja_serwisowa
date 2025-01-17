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
    let sub_username_to_add = body.username_to_add
    let sub_password_to_add = body.password_to_add
    let sub_email_to_add = body.email_to_add
    let sub_user_type = body.user_type_to_add
    try {
        switch (req.method) {
            case 'POST':
                await pool.getConnection();
                let result = await login(sub_username, sub_password, 3);
                if (result.status == 1) {
                    let results = await pool.query('INSERT INTO users(username, password, email, user_type) VALUES ("'+sub_username_to_add+'","'+sub_password_to_add+'","'+sub_email_to_add+'", '+sub_user_type+');');
                    if (results.err) {
                        status = 2
                    }
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
