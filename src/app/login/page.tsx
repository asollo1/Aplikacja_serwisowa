"use client"
import '../globals.css'
import Link from 'next/link'
import Field from '../componets/form/field'
import Back from '../componets/form/back'
import { FormEvent } from 'react'
async function login(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    let username = formData.get("username");
    let password = formData.get("password");
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: password }),
    }).then(response => {
        console.log(response.json);
        return response.json();
    })
    if (response != null) {
        if (response.status == 1) {
            document.cookie = `username=${response.username}`;
            document.cookie = `password=${response.password}`;
            document.cookie = `id=${response.id}`;
            document.cookie = `user_type=${response.user_type}`;
            let location: string = "/login/error";
            if (response.user_type == 1){
                location = '/teacher';
            } else if(response.user_type == 2){
                location ='/service';
            } else if(response.user_type == 3){
                location = '/admin-panel';
            }
            window.location.href = location;
        } else if(response.status == 2){
            window.location.href = '/login/error';
        };
    }
};
export default function Login_menu(){
    return(
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="bg-black border border-white p-10 ">
                <Back href="/"></Back>
                <h1 className="text-2xl md:text-5xl font-extrabold mb-5 md:mb-10">Zaloguj się</h1>
                <form className="text-base md:text-2xl" onSubmit={login}>
                    <Field label="Nazwa użytkownia" id='username' type='text'></Field>
                    <Field label="Hasło" id='password' type='password'></Field>
                    <div className="flex items-center justify-between text-sm md:text-base mb-3">
                        <Link href="/login/password-recovery" className="text-blue-500">Zapomniałeś hasła?</Link>
                    </div>
                    <div className="flex items-center justify-between">
                        <input className="bg-black p-3 border border-white w-full button" type="submit" value={'Zaloguj się'}/>
                    </div>
                </form>
            </div>
        </div>
    )
}