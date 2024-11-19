import mysql from 'mysql'
import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
import dbconn from '@/app/componets/scripts/dbconn'
let response: string = "", status:number = 1;
import Button from '@/app/componets/ui_elements/button';
function Request_item(props: { description: any, id: any, state: any, date: any, user: any, onClick: any }) {
    if (props.state == 0) {
        var status = <div className='rounded-full bg-red-600 p-3'>Zgłoszone</div>;
    } else if (props.state == 1) {
        var status = <div className='rounded-full bg-yellow-600 p-3'>W realizacji</div>;
    } else if (props.state == 2) {
        var status = <div className='rounded-full bg-green-600 p-3 '>Zrealizowane</div>;
    } else {
        var status = <div className='rounded-full bg-blue-800 p-3'>ERROR: Status of nr {props.state} has no coresponding value</div>;
    }
    return (
        <div className="border border-white p-5 m-5">
            <div className="flex flex-col md:flex-row w-full md:text-xl md:mt-3 pb-2 border-b-2">
                <div className="md:w-1/3 my-1 md:my-0">
                    <b>ID: </b>
                    {props.id}
                </div>
                <div className="md:w-1/3 my-1 md:my-0">
                    <b>Data zgłoszenia: </b>
                    {props.date}
                </div>
                <div className="md:w-1/3 my-1 md:my-0">
                    <b>Zgłaszający: </b>
                    {props.user}
                </div>
            </div>
            <div className="mt-3">
                <b>Status:</b>
                {status}
            </div>
            <div className="mt-3">
                <Button content={"Więcej"} onClick={props.onClick} />
            </div>
        </div>
    )
}

export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn();
    var body = await req.json();
    var sub_username = body.username
    var sub_password = body.password
    try {
        switch (req.method) {
            case 'POST':
                pool.connect();
                pool.query('SELECT * FROM users WHERE username = "'+sub_username+'" AND password = "'+sub_password+'";', function (err, results) {
                    if (results[0].id != undefined) {
                        status = 1
                    } else {
                        status = 2
                    }
                });
                if (status == 1){
                    pool.query('SELECT requests.id, requests.description, requests.date_of_request, requests.status, users.username, requests.class FROM requests JOIN users ON requests.user_id = users.id ORDER BY requests.status;', function (err, results){
                        var i = 0;
                        response = results
                    });
                }
                pool.end();
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
