import { getCookie } from "cookies-next";
import { LegacyRef, useEffect, useRef, useState } from "react";
import Button from "../componets/ui_elements/button";
import Title from "../componets/form/title";
import Field from "../componets/form/field";

function UserData(props:{id: number, username: string, email: string, user_type: string, remove: Function, reset_password: Function}){
    return(
        <div className="border border-black dark:border-white p-5 flex flex-col md:flex-row my-5">
            <div className="flex flex-col md:flex-row items-center justify-end w-full">
                <p className="md:w-1/4">Id: {props.id}</p>
                <p className="md:w-1/4">Użytkownik: {props.username}</p>
                <p className="md:w-1/4">E-mail: {props.email}</p>
                <p className="md:w-1/4">Typ użytkownika: {props.user_type}</p>
            </div>
            <Button content={"Resetuj hasło"} onClick={props.reset_password}/>
            <Button content={"Usuń"} onClick={props.remove}/>
        </div>
    )
}

export default function Users(){
    const [data, setData] = useState<any[]>([])
    const [isLoading, setLoading] = useState(true)
    const confirm_box = useRef<HTMLElement>(null);

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
            if (response.status == 1) {
                if (change_mode == 2) {
                    setData(data.filter(item => item.id != user_id))
                } else if (change_mode == 3) {
                    confirm_box.current!.classList.remove("hidden")
                    confirm_box.current!.classList.remove("border-red-500")
                    confirm_box.current!.classList.remove("text-red-500")
                    confirm_box.current!.classList.add("border-green-500")
                    confirm_box.current!.classList.add("text-green-500")
                    confirm_box.current!.innerHTML = "Hasło zostało zresetowane do 'qwerty1234'"
                }
            }
        }
    }

    async function addUser(){
        let username = getCookie("username");
        let password = getCookie("password");
        let formData = new FormData(document.getElementById('add_user_form') as HTMLFormElement);
        const response = await fetch('/api/add_user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, username_to_add: formData.get('username'), user_type_to_add:formData.get("user_type") , email_to_add: formData.get('email'), password_to_add: formData.get('password')}),
        }).then(response => {
            return response.json();
        })
        if (response!= null) {
            if (response.status == 1) {
                setData(data.concat({username: formData.get('username'), user_type: Number(formData.get("user_type")) , email: formData.get('email')}))
                formData.set('username', "")
                formData.set('password', "")
                formData.set('email', "")
                confirm_box.current!.classList.remove("hidden")
                confirm_box.current!.classList.remove("border-red-500")
                confirm_box.current!.classList.remove("text-red-500")
                confirm_box.current!.classList.add("border-green-500")
                confirm_box.current!.classList.add("text-green-500")
                confirm_box.current!.innerHTML = "Użytkownik został dodany pomyślnie"
            } else {
                confirm_box.current!.classList.remove("hidden")
                confirm_box.current!.classList.remove("border-green-500")
                confirm_box.current!.classList.remove("text-green-500")
                confirm_box.current!.classList.add("border-red-500")
                confirm_box.current!.classList.add("text-red-500")
                confirm_box.current!.innerHTML = "Uwaga wystąpił błąd!"
            }
        }
    }

    function user_type(user_type: number){
        switch(user_type){
            case 1:
                return "Nauczyciel"; 
            case 2: 
                return "Serwisant"; 
            case 3: 
                return "Administrator"; 
            default: 
                return "Brak funkcji";
        }
    };    

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
                <div ref={confirm_box as LegacyRef<HTMLDivElement>}></div>
                <form className="mb-2" id="add_user_form">
                    <Field label="Nazwa użytkownika" type="text" id="username"/>
                    <Field label="E-mail" type="email" id="email"/>
                    <label className="block font-bold my-2">
                        Typ użytkownika
                    </label>
                    <select className="border border-black dark:border-white bg-white dark:bg-black p-3 min-w-full" name="user_type" id="cars">
                      <option value="1">Nauczyciel</option>
                      <option value="2">Serwisant</option>
                      <option value="3">Administrator</option>
                    </select>
                    <Field label="Hasło" id="password" type="password"/>
                </form>
                <Button content={"Dodaj nowego użytkownika"} onClick={() => addUser()}/>
            </div>
            <div>
            {data.map(item => 
                <UserData key={item.id} id={item.id} username={item.username} email={item.email} user_type={user_type(item.user_type)} remove={() => manageUser(2, item.id)} reset_password={() => manageUser(1, item.id)}/>
            )}
            </div>
        </div>
    )
}