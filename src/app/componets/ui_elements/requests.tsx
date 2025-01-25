import Button from "@/app/componets/ui_elements/button";
import "@/app/globals.css"
import { LegacyRef, useEffect, useRef, useState } from "react";
import { getCookie } from "cookies-next";
import printServiceReport from "@/app/componets/scripts/gen_raport";

function asciiArrayToString(asciiArray: number[]): string {
    const bytes = new Uint8Array(asciiArray); // Create a Uint8Array from the hex values
    const decoder = new TextDecoder('utf-8'); // Create a UTF-8 decoder
    return decoder.decode(bytes); // Decode the bytes into a string
    return asciiArray.map(num => String.fromCharCode(num)).join('');
}

let notes: any[] = [];

function Request_item(props: { description: any, id: any, state: any, date: any, user: any, onClick: any }) {
    let status
    if (props.state == 1) {
        status = <div className='rounded-full bg-red-600 p-3'>Zgłoszone</div>;
    } else if (props.state == 2) {
        status = <div className='rounded-full bg-yellow-600 p-3'>W realizacji</div>;
    } else if (props.state == 3) {
        status = <div className='rounded-full bg-green-600 p-3 '>Zrealizowane</div>;
    } else {
        status = <div className='rounded-full bg-blue-800 p-3'>ERROR: Status of nr {props.state} has no coresponding value</div>;
    }
    return (
        <div className="border border-black dark:border-white p-5 m-5">
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
            <div className="mt-3">
                <b>Opis:</b><br></br>
                {asciiArrayToString(props.description.data)}
            </div>
            <div className="mt-3">
                <b>Status:</b>
                {status}
            </div>
            <div className="mt-3">
                <Button content={"Więcej"} onClick={props.onClick} />
            </div>
        </div>
    )
}

function Note(props: {note: any, date: string, author: string}){
    return (
        <div className="border border-black dark:border-white p-5 m-5">
            <div className="flex flex-col md:flex-row w-full md:text-xl md:mt-3 pb-2 border-b-2">
                <div className="md:w-1/3 my-1 md:my-0">
                    <b>Data: </b><br></br>
                    {props.date}
                </div>
                <div className="md:w-1/3 my-1 md:my-0">
                    <b>Autor: </b><br></br>
                    {props.author}
                </div>
            </div>
            <div className="mt-3 text-wrap">
                <b>Notatka:</b><br></br>
                {asciiArrayToString(props.note.data)}
            </div>
        </div>
    )
}

function filterNotes(note: any, req_id: number) {
    if (note.req_id == req_id){
        return true;
    } else {
        return false;
    }
}

export default function Requests() {
    const [id, setId] = useState(0)
    const handleIdChange = (id: any) => {
        setId(id);
    };

    const [mode, setMode] = useState(1)
    const handleModeChange = (mode: any) => {
        setMode(mode);
    };

    const [data, setData] = useState<any[]>([])
    const [isLoading, setLoading] = useState(true)

    const cur_state = useRef<HTMLElement>(null)

    function change(id: number) {
        handleIdChange(id);
        handleModeChange(2);
    }

    async function sendNote(id: number){
        let username = getCookie("username");
        let password = getCookie("password");
        let note = service_note.current!.value;
        let response = await fetch('/api/add_note', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: password, note: note, service_request_id: id}),
        }).then(response => {
            return response.json();
        })
        if(response.status == 1){
            service_note.current!.value = "";
        }
    }

    const service_note = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        let username = getCookie("username");
        let password = getCookie("password");
        fetch('/api/service', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: password }),
        }).then(response => {
            return response.json();
        }).then(response => {
            return response.response;
        }).then(response => {
            setData(response);
            setLoading(false);
        })
        fetch('/api/service_notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: getCookie("username"), password: getCookie("password") }),
        }).then(response => {
            return response.json();
        }).then(response => {
            return response.response
        }).then(response => {
            notes = response
        })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data fetched</p>
    if (mode == 1 && data) {
        return (
            <div>
                {data.map(item =>
                    <Request_item key={item.id} description={item.description} id={item.id} state={item.status} date={item.date_of_request.substring(0, 10)} user={item.username} onClick={() => change(item.row_num - 1)}></Request_item>
                )}
            </div>
        )
    } else if (mode == 2) {
        async function changeState(req_status: number) {
            let username = getCookie("username");
            let password = getCookie("password");
            const response = await fetch('/api/change_status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password, set_status: req_status, request_id: data![id].id}),
            }).then(response => {
                return response.json();
            })
            if (response != null) {
                if (response.status == 1) {
                    let status
                    switch (req_status) {
                        case 1:
                            status = "Status: Przyjęte"
                            break;
                        case 2:
                            status = "Status: W realizacji"
                            break;
                        case 3:
                            status = "Status: Zrealizowane"
                            break;
                        default:
                            status = "Status: Nieznany status"
                            break;
                    }
                    cur_state.current!.innerHTML = status;
                }
            }
        }

        let status
        switch (data[id].status) {
            case 1:
                status = <p>Przyjęte</p>
                break;
            case 2:
                status = <p>W realizacji</p>
                break;
            case 3:
                status = <p>Zrealizowane</p>
                break;
            default:
                status = <p>Nieznany status</p>
                break;
        }
        return (
            <div className="h-full w-full flex justify-center">
                <div>
                    <div className="flex w-full flex-col md:flex-row justify-between text-center md:text-left items-center border border-black dark:border-white p-3">
                        <div className="mx-3">Szczegóły zgłoszenia</div>
                        <div className="mx-3">ID: {data[id].id}</div>
                        <div className="mx-3">Sala: {data[id].class}</div>
                        <div className="mx-3" ref={cur_state as LegacyRef<HTMLDivElement>}>Status: {status}</div>
                        <div className="mx-3">Data zgłoszenia: {data[id].date_of_request.substring(0, 10)}</div>
                        <Button content={"Powrót"} onClick={() => handleModeChange(1)} />
                    </div>
                    <div className="border border-black dark:border-white p-3">
                        <p className="text-xl">Opis zgłoszenia:</p>
                        {asciiArrayToString(data[id].description.data)}
                    </div>
                    <div className="border border-black dark:border-white p-3">
                        <p className="text-xl">Notaki serwisu:</p>
                        <div>
                            {(notes.filter(item => filterNotes(item, data[id]!.id))).map(item => <Note date={item.date} author={item.author} note={item.note} />)}
                        </div>
                        <textarea rows={6} className="w-full bg-white dark:bg-black mb-3 border border-black dark:border-white p-3" ref={service_note as LegacyRef<HTMLTextAreaElement>}>
                        </textarea>
                        <Button content={"Zapisz"} onClick={() => sendNote(data![id].id)}/>
                    </div>
                    <div className="flex w-full flex-col md:flex-row justify-evenly text-center md:text-left items-center border border-black dark:border-white p-3">
                        <div className="flex md:flex-row border border-black dark:border-white items-center justify-between p-2 mb-2">
                            <p>Ustaw status:</p>
                            <div className="md:ml-5">
                                <Button onClick={() => changeState(1)} content={"Przyjęte"} />
                                <Button onClick={() => changeState(2)} content={"W realizacji"} />
                                <Button onClick={() => changeState(3)} content={"Zrealizowane"} />
                            </div>
                        </div>
                        <Button content={"Generuj raport"} onClick={() => {printServiceReport(data[id].id, data[id].username, asciiArrayToString(data[id].description.data), data[id].date_of_request.substring(0, 10), data[id].class, notes.filter(item => filterNotes(item, data[id].id)))}}/>
                    </div>
                </div>
            </div>
        )
    }
}