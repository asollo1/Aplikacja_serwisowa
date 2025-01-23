import { getCookie } from "cookies-next";
import { useState } from "react";
import { useEffect } from "react";

function asciiArrayToString(asciiArray: number[]): string {
    return asciiArray.map(num => String.fromCharCode(num)).join('');
}

function Request_item(props: {description: any,id: any,state: any, date: any, user: any, class_number: any}){
    let status_local;
    switch(props.state){
        case 1:
            status_local = (<div className='rounded-full bg-red-600 p-3'>Zgłoszone</div>);
            break
        case 2:
            status_local = (<div className='rounded-full bg-yellow-600 p-3'>W realizacji</div>);
            break
        case 3:
            status_local = (<div className='rounded-full bg-green-600 p-3 '>Zrealizowane</div>);
            break
        default:
            status_local = (<div className='rounded-full bg-blue-800 p-3'>ERROR: Status of nr "+props.state+" has no coresponding value</div>);
    }
    const year = props.date.getFullYear();
    const month = String(props.date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(props.date.getDate()).padStart(2,'0');

    const formattedDate = `${year}-${month}-${day}`;
    return (
        <div className="border border-white p-5 m-5">
            <div className="flex flex-col md:flex-row w-full md:text-xl md:mt-3 pb-2 border-b-2">
                <div className="md:w-1/4 my-1 md:my-0">
                    <b>ID: </b> 
                    {props.id}
                </div>
                <div className="md:w-1/4 my-1 md:my-0">
                    <b>Data zgłoszenia: </b>
                    {formattedDate}
                </div>
                <div className="md:w-1/4 my-1 md:my-0">
                    <b>Zgłaszający: </b> 
                    {props.user}
                </div>
                <div className="md:w-1/4 my-1 md:my-0">
                    <b>Klasa: </b> 
                    {props.class_number}
                </div>
            </div>
            <div className="mt-5">
                <b>Opis: </b><br></br>
                {props.description}
            </div>
            <div className="mt-3">
                <b>Status:</b> 
                {status_local}
            </div>
        </div>
    )
}

export default function Requests(){
    const [data, setData] = useState<any[]>([])
    const [isLoading, setLoading] = useState(true)
   
    useEffect(() => {
        let username = getCookie("username");
        let password = getCookie("password");
        fetch('/api/teacher', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: password}),
        }).then(response => {
            return response.json();
        }).then(response => {
            setData(response.response);
            setLoading(false)
        })
    }, [])
   
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data fetched</p>

    return (
        <div>
            <div>
                {data.map(item =>
                    <Request_item key={item.id} description={asciiArrayToString(item.description.data)} id={item.id} state={item.status} date={new Date(item.date_of_request)} user={item.username} class_number={item.class}></Request_item>
                )}
            </div>
        </div>
    )
}