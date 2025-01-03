import dbconn from '@/app/componets/scripts/dbconn';
import login from '@/app/componets/scripts/login';
import mysql from 'mysql'
import { NextApiRequest, NextApiResponse} from 'next'
import { NextResponse, NextRequest } from 'next/server'
let response: string = "";

function Request_item(description: any,id: any,state: any, date: any, user: any, class_number: any){
    let status_local = "";
    if(state == 1){
        status_local = "<div class='rounded-full bg-red-600 p-3'>Zgłoszone</div>";
    } else if(state == 2){
        status_local = "<div class='rounded-full bg-yellow-600 p-3'>W realizacji</div>";
    } else if(state == 3){
        status_local = "<div class='rounded-full bg-green-600 p-3 '>Zrealizowane</div>";
    } else {
        status_local = "<div class='rounded-full bg-blue-800 p-3'>ERROR: Status of nr "+state+" has no coresponding value</div>";
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2,'0');

    const formattedDate = `${year}-${month}-${day}`;
    return (
        '<div class="border border-white p-5 m-5">\
            <div class="flex flex-col md:flex-row w-full md:text-xl md:mt-3 pb-2 border-b-2">\
                <div class="md:w-1/4 my-1 md:my-0">\
                    <b>ID: </b> \
                    '+id+'\
                </div>\
                <div class="md:w-1/4 my-1 md:my-0">\
                    <b>Data zgłoszenia: </b>\
                    '+formattedDate+'\
                </div>\
                <div class="md:w-1/4 my-1 md:my-0">\
                    <b>Zgłaszający: </b> \
                    '+user+'\
                </div>\
                <div class="md:w-1/4 my-1 md:my-0">\
                    <b>Klasa: </b> \
                    '+class_number+'\
                </div>\
            </div>\
            <div class="mt-5">\
                <b>Opis: </b><br></br>\
                '+description+'\
            </div>\
            <div class="mt-3">\
                <b>Status:</b> \
                '+status_local+'\
            </div>\
        </div>'
    )
}

export async function POST(req: NextRequest, res: NextApiResponse) {
    const pool = dbconn()
    let body = await req.json();
    let sub_username = body.username
    let sub_password = body.password
    let sub_id = body.id
    try {
        switch (req.method) {
            case 'POST':
                let result = await login(sub_username, sub_password);
                if (result.status == 1){
                    pool.connect();
                    pool.query('SELECT requests.id, requests.description, requests.date_of_request, requests.status, requests.class, users.username FROM requests JOIN users ON requests.user_id = users.id WHERE user_id='+sub_id+' ORDER BY requests.status;', function (err, results){
                        let i = 0;
                        response = ""
                        while(results[i] != undefined){
                            response += Request_item(results[i].description, results[i].id, results[i].status, results[i].date_of_request, results[i].username, results[i].class)
                            i += 1;
                        }
                    });
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
