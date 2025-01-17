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
                let result = await login(sub_username, sub_password, 3);
                if (result.status == 1){
                    await pool.getConnection();
                    response = await pool.query('SELECT id, email, username FROM users;')
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
