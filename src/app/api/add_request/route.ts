import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import dbconn from '@/app/componets/scripts/dbconn';
import login from '@/app/componets/scripts/login';
export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    let body = await req.json();
    let sub_username = body.username
    let sub_password = body.password
    let sub_description = body.description
    let sub_room_number = body.room_number
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2,'0');

    const formattedDate = `${year}-${month}-${day}`;
    try {
        switch (req.method) {
            case 'POST':
                await pool.getConnection();
                let result = await login(sub_username, sub_password);
                if (result.status == 1 && result.id != null) {
                    if ((await pool.query(`INSERT INTO requests(user_id, description, status, date_of_request, class) VALUES ('${result.id}', "${sub_description}", 1, "${formattedDate}", ${sub_room_number});`)).err) {
                        result.status = 2
                    }
                }
                pool.end();
                return NextResponse.json({"status": result.status}, {status: 200});
                break;
            default:
                return NextResponse.json({ message: 'Method not allowed' }, {status: 405});
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
