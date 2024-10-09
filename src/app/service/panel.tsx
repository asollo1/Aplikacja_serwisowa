import Requests from "./requests"
import Request_details from "./request-details"
export default function Panel(props: {options: any}){
        if (props.options == 1){
            return (
                <Requests />
            )
        } else if (props.options == 3) {
            return (
                <div className="w-full h-full flex justify-center items-center">
                    <p className="text-center text-2xl text-white">Witaj w panelu serwisanta</p>
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