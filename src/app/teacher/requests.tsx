import { getCookie } from "cookies-next";
import { useState } from "react";
import { useEffect } from "react";
export default function Requests(){
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
   
    useEffect(() => {
        var username = getCookie("username");
        var password = getCookie("password");
        var id = getCookie("id")
        fetch('/api/teacher', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: password, id: id }),
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