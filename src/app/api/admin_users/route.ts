import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import login from '@/app/componets/scripts/login';
import dbconn from '@/app/componets/scripts/dbconn'
import { sanitizeInput, inputTypeValidation } from '@/app/componets/scripts/input_validation';
let response: string = "";

export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    let body = await req.json();
    let sub_username = sanitizeInput(body.username)
    let sub_password = sanitizeInput(body.password)
    try {
        switch (req.method) {
            case 'POST':
                if(inputTypeValidation(["string", "string"], [sub_username, sub_password])){
                    return NextResponse.json({ message: 'Error: invalid input types' }, {status: 400});
                }
                let result = await login(sub_username, sub_password, 3);
                if (result.status == 1){
                    await pool.getConnection();
                    response = await pool.query('SELECT id, email, username, user_type FROM users;')
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
