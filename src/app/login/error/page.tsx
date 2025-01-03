"use client"
import '../../globals.css'
import Link from 'next/link'
import Field from '../../componets/form/field'
import Back from '../../componets/form/back'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
export default function Login_menu(){
    const router = useRouter()
    async function login(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        const formData = await new FormData(event.currentTarget)
        let username = formData.get("username");
        let password = formData.get("password");
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: username, password: password }),
        }).then(response => {
            return response.json();
        })
        if (response != null) {
            if (response.status == 1) {
                setCookie("username", response.username);
                setCookie("password", response.password);
                setCookie("id", response.id);
                setCookie("user_type", response.user_type);
                if (response.user_type == 1){
                    router.push('/teacher');
                } else if(response.user_type == 2){
                    router.push('/service');
                } else if(response.user_type == 3){
                    router.push('/admin-panel');
                }
            } else if(response.status == 2){
                router.push('/login/error');
            };
        }
    };
    return(
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="bg-black border border-white p-10 ">
                <Back href="/"></Back>
                <h1 className="text-2xl md:text-5xl font-extrabold mb-5 md:mb-10">Zaloguj się</h1>
                <p className="text-sm md:text-base text-red-500 max-w-fit mb-1 p-2 min-w-full text-center border border-red-500">Sprawdź, czy nazwa użytkownika<br></br> i hasło są poprawne</p>
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