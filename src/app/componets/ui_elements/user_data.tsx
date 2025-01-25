import { useState, FormEvent, LegacyRef, useRef} from "react";
import { getCookie, setCookie } from "cookies-next";
import Title from "@/app/componets/form/title";
import Field from "@/app/componets/form/field";

export default function UserDataPanel(){
    let confirm_box = useRef<HTMLElement>(null);
    async function send(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        const formData = await new FormData(event.currentTarget)
        let username = getCookie("username");
        let email = formData.get("form_email");
        let password = formData.get("form_password");
        const response = await fetch('/api/change_user_data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: username, old_password: getCookie("password"), password: password, email: email}),
        }).then(response => {
            return response.json();
        })
        if (response != null) {
            if (response.status == 1) {
                setCookie("username", response.username);
                setCookie("password", response.password);
                setCookie("emial", response.email);
                confirm_box.current!.classList.remove("hidden")
                confirm_box.current!.classList.remove("border-red-500")
                confirm_box.current!.classList.remove("text-red-500")
                confirm_box.current!.classList.add("border-green-500")
                confirm_box.current!.classList.add("text-green-500")
                confirm_box.current!.textContent = "Zmiany zostały zapisane pomyślnie";
            } else if(response.status == 2){
                confirm_box.current!.classList.remove("hidden")
                confirm_box.current!.classList.remove("border-green-500")
                confirm_box.current!.classList.remove("text-green-500")
                confirm_box.current!.classList.add("border-red-500")
                confirm_box.current!.classList.add("text-red-500")
                confirm_box.current!.textContent = "Zmainy NIE zostały zapisane, spróbuj ponownie";
            };
        }
    };
    return (
        <div className="w-full h-full flex justify-center items-center">
                <div className="border border-black dark:border-white p-5">
                    <Title label="Dane użytkownika"></Title>
                    <p className="text-sm md:text-base max-w-fit mb-1 p-2 min-w-full text-center border hidden" ref={confirm_box as LegacyRef<HTMLInputElement>}></p>
                    <form className="flex flex-col gap-4" onSubmit={send}>
                        <Field label="Nazwa użytkownika" id='username' type='text' readonly={true} value={getCookie("username")}/>
                        <Field label="Email" id='form_email' type='email' value={getCookie("email")}/>
                        <Field label="Hasło" id='form_password' type='text' value={getCookie("password")}/>
                        <button type='submit' className="button py-3 px-5 border border-black dark:border-white">
                            Zapisz zmiany
                        </button>
                    </form>
                </div>
            </div>
    )
}
