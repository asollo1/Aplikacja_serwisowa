import Requests from "./requests"
import Users from "./users"
export default function Panel(props: {options: any}){
        if (props.options == 1){
            return (
                <Requests />
            )
        } else if (props.options == 2) {
            return (
                <Users />
            )

        } else if (props.options == 4) {
            return (
                <div className="w-full h-full flex justify-center items-center">
                    <p className="text-center text-2xl text-white">Witaj w panelu administratora</p>
                </div>
            )
        } else {
            return (
                <div className="bg-red-500 text-black absolute m-auto p-10 border border-white">
                    Error: No panel module of ID: {props.options}
                </div>
            )
        }
}