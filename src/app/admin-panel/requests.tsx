function Request_item(props: {description: any,id: any,state: any, date: any, user: any}){
    if(props.state == 0){
        var status = <div className='rounded-full bg-red-600 p-3'>Zgłoszone</div>;
    } else if(props.state == 1){
        var status = <div className='rounded-full bg-yellow-600 p-3'>W realizacji</div>;
    } else if(props.state == 2){
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
            <div className="mt-5">
                <b>Opis: </b><br></br>
                {props.description}
            </div>
            <div className="mt-3">
                <b>Status:</b> 
                {status}
            </div>
        </div>
    )
}
export default function Requests(){
    return (
        <div>
            <p className="text-3xl font-bold text-center md:text-left">Requests</p>
            <Request_item description="Opis zgłoszenia 1" id="1" state="0" user="Mariola Szczęch" date="04.10.2024"/>
            <Request_item description="Opis zgłoszenia 2" id="2" state="1" user="Mariola Szczęch" date="04.10.2024"/>
            <Request_item description="Opis zgłoszenia 2" id="2" state="1" user="Mariola Szczęch" date="04.10.2024"/>
            <Request_item description="Opis zgłoszenia 3" id="3" state="2" user="Mariola Szczęch" date="04.10.2024"/>
            <Request_item description="Opis zgłoszenia 4" id="4" state="3" user="Mariola Szczęch" date="04.10.2024"/>
        </div>
    )
}