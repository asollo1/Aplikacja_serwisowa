import Requests from "./requests"
import Report_form from "../componets/report_form"
export default function Panel(props: {options: any}){
        if (props.options == 1){
            return (
                <Requests />
            )
        } else if (props.options == 2){
            return (
                <Report_form />
            )
        } else if (props.options == 3) {
            return (
                <div className="w-full h-full flex justify-center items-center">
                    <p className="text-center text-2xl text-white">Witaj w panelu nauczyciela</p>
                </div>
            )
        } else {
            return (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-red-500 text-black absolute m-auto p-10 border border-white">
                        Error: No panel module of ID: {props.options}
                    </div>
                </div>
            )
        }
}