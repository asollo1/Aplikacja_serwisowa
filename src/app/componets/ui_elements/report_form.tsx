'use client'
import Back from "../form/back"
import Title from "../form/title"
import Field from "../form/field"
import Button from "./button"
import '@/app/globals.css';
import { FormEvent, LegacyRef, MutableRefObject, useState } from 'react'
import { getCookie } from "cookies-next"
import { useRef } from "react"

export default function Report_form(props: { back?: boolean; }) {
    let back = <div></div>
    let confirm_box = useRef<HTMLElement>(null);
    let field = useRef<HTMLTextAreaElement>(null);
    async function send(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        let username = getCookie("username");
        let password = getCookie("password");
        let user_id = getCookie("id");
        let description = formData.get("description")
        let room_number = formData.get("room_number");
        const response = await fetch('/api/add_request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, description: description, room_number: room_number, user_id: user_id }),
        }).then(response => {
            return response.json();
        }).then(response => {
            if (response.status == 1) {
                confirm_box.current!.classList.remove("hidden")
                confirm_box.current!.classList.remove("border-red-500")
                confirm_box.current!.classList.remove("text-red-500")
                confirm_box.current!.classList.add("border-green-500")
                confirm_box.current!.classList.add("text-green-500")
                confirm_box.current!.innerHTML = "Zgłoszenie zostało wysłane pomyślnie"
                field.current!.value = ""
            } else {
                confirm_box.current!.classList.remove("hidden")
                confirm_box.current!.classList.remove("border-green-500")
                confirm_box.current!.classList.remove("text-green-500")
                confirm_box.current!.classList.add("border-red-500")
                confirm_box.current!.classList.add("text-red-500")
                confirm_box.current!.innerHTML = "Uwaga wystąpił błąd!"
            }
        })
    }
    const [mode, setmode] = useState(1);
    if (mode == 1) {
        if (props.back) {
            let back = <Back href="/dashboard"></Back>
        }
        return (
            <div className="w-full h-full flex justify-center items-center">
                {back}
                <div className="border border-white p-5">
                    <p className="text-sm md:text-base max-w-fit mb-1 p-2 min-w-full text-center border hidden" ref={confirm_box as LegacyRef<HTMLInputElement>}></p>
                    <Title label="Utwórz zgłoszenie"></Title>
                    <form className="flex flex-col gap-4" onSubmit={send}>
                        <label className="block font-bold mt-2" itemType="textarea">
                            Opis
                        </label>
                        <textarea className="border border-white bg-black p-3 min-w-full" id="description" name="description" required rows={4} ref={field as LegacyRef<HTMLTextAreaElement>}/>
                        <Field label="Nr sali" id='room_number' type='number' />
                        <button type='submit' className="button py-3 px-5 border cursor-pointer border-white">
                            Wyślij
                        </button>
                    </form>
                </div>
            </div>
        )
    } else if (mode == 2) {
        <div className="w-full h-full flex justify-center items-center">
            <div className="border border-green-600 p-5">
                Zgłoszenie wysłane pomyślnie
                <Button content={"Powrót"} onClick={() => setmode(1)} />
            </div>
        </div>
    } else if (mode == 3) {
        <div className="w-full h-full flex justify-center items-center">
            <div className="border border-red-600 p-5">
                Nastąpił błąd, spróbuj ponownie
                <Button content={"Powrót"} onClick={() => setmode(1)} />
            </div>
        </div>
    }
}