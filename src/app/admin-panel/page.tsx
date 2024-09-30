import Title from "../componets/form/title"
import Button from "../componets/button"
export default function Admin_panel(){
    return (
        <div className="flex flex-row h-screen w-screen">
            <div className="h-full w-1/5 border-r-2 border-white p-10 flex flex-col items-center justify-center">
                <Title label="Admin panel"></Title>
                <div className="mt-10 text-center">
                    <Button content="Requests"></Button>
                    <Button content="Users"></Button>
                    <Button content="Logs"></Button>
                    <Button content="Log off"></Button>
                </div>
            </div>
        </div>
    )
}