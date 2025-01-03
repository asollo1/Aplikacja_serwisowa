import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Button from "../componets/ui_elements/button";
import Title from "../componets/form/title";
import Field from "../componets/form/field";

function UserData(props:{id: number, username: string, email: string, remove: Function, reset_password: Function}){
    return(
        <div className="border border-white p-5 flex flex-col md:flex-row my-5">
            <div className="flex flex-col md:flex-row items-center justify-end w-full">
                <p className="md:w-1/3">Id: {props.id}</p>
                <p className="md:w-1/3">Użytkownik: {props.username}</p>
                <p className="md:w-1/3">E-mail: {props.email}</p>
            </div>
            <Button content={"Resetuj hasło"} onClick={props.reset_password}/>
            <Button content={"Usuń"} onClick={props.remove}/>
        </div>
    )
}

export default function Users(){
    const [data, setData] = useState<any[]>([])
    const [isLoading, setLoading] = useState(true)
    async function manageUser(change_mode: number, user_id: number) {
        let username = getCookie("username");
        let password = getCookie("password");
        const response = await fetch('/api/menage_user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, change_mode: change_mode, user_id: user_id}),
        }).then(response => {
            return response.json();
        })
        if (response != null) {
            if (response.status == 1 && data) {
                let data_temp = data
                setData(data_temp)
            }
        }
    }
    useEffect(() => {
        let username = getCookie("username");
        let password = getCookie("password");
        let response = fetch('/api/admin_users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: password}),
        }).then(response => {
            return response.json();
        }).then(response => {
            return response.response
        }).then(response => {
            setData(response);
            setLoading(false)
        })

    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data fetched</p>
    return (
        <div>
            <div>
                <Title label="Dodaj używkonika"/>
                <form className="mb-2">
                    <Field label="Nazwa użytkownika" type="text" id="username"/>
                    <Field label="E-mail" type="email" id="email"/>
                    <Field label="Hasło" id="password" type="password"/>
                </form>
                <Button content={"Dodaj nowego użytkownika"} onClick={() => manageUser(0, 0)}/>
            </div>
            <div>
            {data.map(item => 
                <UserData key={item.id} id={item.id} username={item.username} email={item.email} remove={() => manageUser(2, item.id)} reset_password={() => manageUser(1, item.id)}/>
            )}
            </div>
        </div>
    )
}