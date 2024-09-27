import '../globals.css'
export default function Login_menu(){
    return(
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="bg-black border border-white p-10 ">
                <h1 className="text-5xl font-extrabold mb-10">Zaloguj się</h1>
                <form className="text-2xl">
                    <div className="mb-5">
                        <label className="block font-bold mb-2" itemType="username">
                            Nazwa użytkownika
                        </label>
                        <input className="border border-white bg-black p-3" id="username" type="text" name="username" required/>
                    </div>
                    <div>
                        <label className="block font-bold mb-2" itemType="password">
                            Hasło
                        </label>
                        <input className="border border-white bg-black p-3 " id="password" type="password" name="password" required/>
                    </div>
                    <div className="flex items-center justify-between text-base mb-3">
                        <a href="#" className="text-blue-500">Zapomniałeś hasła?</a>
                    </div>
                    <div className="flex items-center justify-between">
                        <input className="bg-black p-3 border border-white w-full button" type="submit" value={'Zaloguj się'}/>
                    </div>
                </form>
            </div>
        </div>
    )
}