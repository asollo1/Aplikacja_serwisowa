import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import login from '@/app/componets/scripts/login';
import dbconn from '@/app/componets/scripts/dbconn'
import { sanitizeInput, inputTypeValidation } from '@/app/componets/scripts/input_validation';
let response: any;

export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    let body = await req.json();
    let sub_username = sanitizeInput(body.username)
    let sub_password = sanitizeInput(body.password)
    try {
        switch (req.method) {
            case 'POST':
                if (inputTypeValidation(["sting", "string"], [sub_username, sub_password])){
                    return NextResponse.json({ message: 'Error: invalid input types' }, {status: 400});
                }
                let result = await login(sub_username, sub_password, 2);
                if (result.status == 1){
                    await pool.getConnection();
                    response = await pool.query('SELECT notes.id, notes.note, users.username as author, notes.req_id, notes.date FROM notes INNER JOIN users ON notes.user_id = users.id;')
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
