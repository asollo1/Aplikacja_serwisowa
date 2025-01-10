import { NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import login from '@/app/componets/scripts/login';
export async function POST(req: NextRequest, res: NextApiResponse) {
    let body = await req.json();
    let sub_username = body.username
    let sub_password = body.password
    try {
        switch (req.method) {
            case 'POST':
                let result = await login(sub_username, sub_password);
                return NextResponse.json({
                    "id": result.id,
                    "username": result.username,
                    "password": result.password,
                    "user_type": result.user_type,
                    "email": result.email,
                    "status": result.status}, {status: 200});
                break;
            default:
                return NextResponse.json({ message: 'Method not allowed' }, {status: 405});
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
