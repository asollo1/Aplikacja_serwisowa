import { NextApiRequest, NextApiResponse} from 'next'
import login from '@/app/componets/scripts/login';
import { NextResponse, NextRequest } from 'next/server'
import dbconn from '@/app/componets/scripts/dbconn';
import { inputTypeValidation, sanitizeInput } from '@/app/componets/scripts/input_validation';
let status:any = 1;
export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    let body = await req.json();
    let sub_username = sanitizeInput(body.username)
    let sub_password = sanitizeInput(body.password)
    let sub_request_id = sanitizeInput(body.request_id)
    let sub_request_status = sanitizeInput(body.set_status)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2,'0');
    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');
    let cur_date = `${hour}:${minute} ${day}.${month}.${year}`
    let state;
    switch(sub_request_status) {
        case 1:
            state = "Przyjęte"
            break;
        case 2:
            state = "W realizacji"
            break;
        case 3:
            state = "Zrealizowane"
            break;
        default:
            state = "Błędny status"
    }
    try {
        switch (req.method) {
            case 'POST':
                if (inputTypeValidation(["string", "string", "number", "number"], [sub_username, sub_password, sub_request_status, sub_request_id])){
                    return NextResponse.json({ message: 'Error: invalid input types' }, {status: 400});
                }
                let result = await login(sub_username, sub_password, 2);
                if (result.status == 1) {
                    await pool.getConnection();
                    let results = await pool.query(
                        `
                        UPDATE requests SET status = ${sub_request_status} WHERE id = ${sub_request_id}; 
                        `
                    )
                    await pool.query(`INSERT INTO notes(note, user_id, req_id, date) VALUES ("Zmiana statusu na: ${state}", ${result.id}, ${sub_request_id}, "${cur_date}");`)
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
