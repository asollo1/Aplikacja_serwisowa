import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import login from '@/app/componets/scripts/login';
import dbconn from '@/app/componets/scripts/dbconn'
let response: any;

export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    let body = await req.json();
    let sub_username = body.username
    let sub_password = body.password
    try {
        switch (req.method) {
            case 'POST':
                let result = await login(sub_username, sub_password, 2);
                if (result.status == 1){
                    await pool.getConnection();
                    response = await pool.query('SELECT ROW_NUMBER() OVER (ORDER BY requests.status) AS row_num, requests.id, requests.description, CAST(requests.date_of_request AS CHAR) AS date_of_request, requests.status, users.username, requests.class FROM requests JOIN users ON requests.user_id = users.id ORDER BY requests.status;')
                    pool.end();
                    console.log(response)
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
