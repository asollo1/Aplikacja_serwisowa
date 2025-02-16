import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import dbconn from '@/app/componets/scripts/dbconn';
import login from '@/app/componets/scripts/login';
import { sanitizeInput, inputTypeValidation } from '@/app/componets/scripts/input_validation';
let status:any = 1;
export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    let body = await req.json();
    let sub_username = sanitizeInput(body.username)
    let sub_password = sanitizeInput(body.password)
    let sub_email = sanitizeInput(body.email)
    var sub_old_password = sanitizeInput(body.old_password)
    try {
        switch (req.method) {
            case 'POST':
                if (inputTypeValidation(["string", "string", "string", "string"], [sub_username, sub_email, sub_old_password, sub_password])){
                    return NextResponse.json({ message: 'Error: invalid input types' }, {status: 400});
                }
                let result = await login(sub_username, sub_old_password);
                if (result.status == 1) {
                    await pool.getConnection();
                    let results = await pool.query(`UPDATE users SET password = "${sub_password}", email = "${sub_email}" WHERE username = "${sub_username}";`)
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
