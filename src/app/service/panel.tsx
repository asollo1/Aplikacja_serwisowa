import Requests from "./requests"
import Report_form from "../componets/ui_elements/report_form"
import UserDataPanel from "@/app/componets/ui_elements/user_data"
export default function Panel(props: {options: any}){
    switch (props.options){
        case 1: 
            return (
                <Requests />
            )
        case 2:
            return (
                <Report_form />
            )
        case 3:
            return (
                <UserDataPanel/>
            )
        case 4:
            return (
                <div className="w-full h-full flex justify-center items-center">
                    <p className="text-center text-2xl text-white">Witaj w panelu serwisanta</p>
                </div>
            )
        default:
            return (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-red-500 text-black absolute m-auto p-10 border border-white">
                        Error: No panel module of ID: {props.options}
                    </div>
                </div>
            )
    }
}