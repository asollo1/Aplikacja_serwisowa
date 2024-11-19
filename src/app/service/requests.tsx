import Button from "../componets/ui_elements/button";
import "../globals.css"
import { JSXElementConstructor, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

function Request_item(props: { description: any, id: any, state: any, date: any, user: any, onClick: any }) {
    if (props.state == 0) {
        var status = <div className='rounded-full bg-red-600 p-3'>Zgłoszone</div>;
    } else if (props.state == 1) {
        var status = <div className='rounded-full bg-yellow-600 p-3'>W realizacji</div>;
    } else if (props.state == 2) {
        var status = <div className='rounded-full bg-green-600 p-3 '>Zrealizowane</div>;
    } else {
        var status = <div className='rounded-full bg-blue-800 p-3'>ERROR: Status of nr {props.state} has no coresponding value</div>;
    }
    return (
        <div className="border border-white p-5 m-5">
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
                <b>Status:</b>
                {status}
            </div>
            <div className="mt-3">
                <Button content={"Więcej"} onClick={props.onClick} />
            </div>
        </div>
    )
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
    const [data_rec, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        var username = getCookie("username");
        var password = getCookie("password");
        var response = fetch('/api/service', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: password}),
        }).then(response => {
            return response.json();
        }).then(response => {
            return response.response
        }).then(response => {
            var res 
            for(var i in response){
                res += (<Request_item description={response[i].description} id={response[i].id} state={response[i].state} user={response[i].username} date={response[i].date_of_request} onClick={() => { handleIdChange(response[i].id); handleModeChange(2) }}/>)
            }
            return res
        })
        setData(response);
        setLoading(false)
    }, [])
    if (isLoading) return <p>Loading...</p>
    if (!data_rec) return <p>No data fetched</p>
    if (mode == 1) {
        return data_rec
    } else if (mode == 2) {
        var sala = 6;
        var status = "Zgłoszone";
        var data = "04.10.2024";
        return (
            <div className="h-full w-full flex items-center justify-center">
                <div>
                    <div className="flex w-full md:flex-row justify-between text-center md:text-left items-center border border-white p-3">
                        <p>Szczegóły zgłoszenia ID: {id}</p>
                        <p>Sala: {sala}</p>
                        <p>Status: {status}</p>
                        <p>Data zgłoszenia: {data}</p>
                        <Button content={"Powrót"} onClick={() => handleModeChange(1)} />
                    </div>
                    <div className="border border-white p-3">
                        <p className="text-xl">Opis zgłoszenia:</p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eius tempore facere similique, earum quae assumenda culpa minima esse aut voluptatem velit voluptatibus laborum. Ducimus eaque, asperiores amet, aliquam nulla tempora odio similique sapiente nemo eos fugit, itaque cum corporis deserunt? In nobis corporis autem rerum possimus pariatur quibusdam. Quibusdam dolore deserunt doloribus accusantium laudantium aspernatur dolorem quae ab veniam, necessitatibus, nobis debitis fugiat odit quam voluptatibus alias molestias ipsum, mollitia totam cumque. Dolorem cumque recusandae quia, est sed quos architecto natus, ea distinctio nihil laborum nulla obcaecati, ipsum maxime similique perspiciatis id expedita ullam. At perspiciatis soluta earum fugiat ex pariatur temporibus dolorem, exercitationem voluptatem. Mollitia repellendus est officiis aut incidunt laboriosam enim possimus, nemo eos eligendi facilis molestiae dolore fugiat quis id earum amet officia omnis rem nostrum et beatae. Deserunt qui dolore blanditiis eum voluptas aliquid explicabo ratione accusamus tempora, expedita molestias quis a officia saepe quaerat excepturi natus, animi id dolorum quidem recusandae! Suscipit porro voluptas explicabo exercitationem iure qui ipsum, cum distinctio repellendus. Modi error sunt illum, adipisci atque, totam dolor exercitationem eos corporis esse unde laudantium, nostrum quae eveniet quisquam dolorem nobis ratione velit voluptates minima porro sit! Eius expedita voluptas esse explicabo consectetur!
                    </div>
                    <div className="border border-white p-3">
                        <p className="text-xl">Notaka serwisu:</p>
                        <textarea rows={6}  className="w-full bg-black mb-3 border border-white p-3">

                        </textarea>
                        <Button content={"Zapisz"}/>
                    </div>
                    <div className="flex w-full md:flex-row justify-evenly text-center md:text-left items-center border border-white p-3">
                        <div className="flex md:flex-row border border-white items-center justify-between p-2">
                            <p>Ustaw status:</p>
                            <div className="md:ml-5">
                                <Button content={"Przyjęte"}/>
                                <Button content={"W realizacji"}/>
                                <Button content={"Zrealizowane"}/>
                            </div>
                        </div>
                        <Button content={"Generuj raport"}/>
                    </div>
                </div>
            </div>
        )
    }
}