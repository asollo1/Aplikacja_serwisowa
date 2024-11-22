import { getCookie } from "cookies-next";
import { useState } from "react";
import { useEffect } from "react";
import next from "next";
function Request_item(props: {description: any,id: any,state: any, date: any, user: any}){
    if(props.state == 1){
        let status = <div className='rounded-full bg-red-600 p-3'>Zgłoszone</div>;
    } else if(props.state == 2){
        let status = <div className='rounded-full bg-yellow-600 p-3'>W realizacji</div>;
    } else if(props.state == 3){
        let status = <div className='rounded-full bg-green-600 p-3 '>Zrealizowane</div>;
    } else {
        let status = <div className='rounded-full bg-blue-800 p-3'>ERROR: Status of nr {props.state} has no coresponding value</div>;
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
            <div className="mt-5">
                <b>Opis: </b><br></br>
                {props.description}
            </div>
            <div className="mt-3">
                <b>Status:</b> 
                {status}
            </div>
        </div>
    )
}
export default function Requests(){
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
   
    useEffect(() => {
        let username = getCookie("username");
        let password = getCookie("password");
        fetch('/api/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: password }),
        }).then(response => {
            return response.json();
        }).then(response => {
            setData(response.response);
            setLoading(false)
        })
    }, [])
   
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data fetched</p>
    console.log(data)
    return (
        <div>
            <p className="text-3xl font-bold text-center md:text-left">Requests</p>
            <div dangerouslySetInnerHTML={{ __html: data}}></div>
        </div>
    )
}