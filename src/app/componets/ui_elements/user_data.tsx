import { useEffect, useState, FormEvent, LegacyRef, useRef} from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from 'next/navigation'
import Title from "@/app/componets/form/title";
import Field from "@/app/componets/form/field";

export default function UserDataPanel(){
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()
    let confirm_box = useRef<HTMLElement>(null);
    let field = useRef<HTMLTextAreaElement>(null);

    async function send(event: FormEvent<HTMLFormElement>){
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

    useEffect(() => {
        let username = getCookie("username");
        let password = getCookie("password");
        let id = getCookie("id")
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

    return (
        <div className="w-full h-full flex justify-center items-center">
                <div className="border border-white p-5">
                    <p className="text-sm md:text-base max-w-fit mb-1 p-2 min-w-full text-center border hidden" ref={confirm_box as LegacyRef<HTMLInputElement>}></p>
                    <Title label="Utwórz zgłoszenie"></Title>
                    <form className="flex flex-col gap-4" onSubmit={send}>
                        <label className="block font-bold mt-2" itemType="textarea">
                            Opis
                        </label>
                        <textarea className="border border-white bg-black p-3 min-w-full" id="description" name="description" required rows={4} ref={field as LegacyRef<HTMLTextAreaElement>}/>
                        <Field label="Nr sali" id='room_number' type='number' />
                        <button type='submit' className="button py-3 px-5 border border-white">
                            Wyślij
                        </button>
                    </form>
                </div>
            </div>
    )
}
