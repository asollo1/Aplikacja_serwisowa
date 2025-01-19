import { getCookie } from "cookies-next";
import { useState } from "react";
import { useEffect } from "react";
export default function Requests(){
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
   
    useEffect(() => {
        let username = getCookie("username");
        let password = getCookie("password");
        let id = getCookie("id")
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
            <p className="text-3xl font-bold text-center md:text-left">Requests</p>
            <div dangerouslySetInnerHTML={{ __html: data}}></div>
        </div>
    )
}