import '../../globals.css'
import Link from 'next/link'
import Field from '@/app/componets/form/field'
import Title from '@/app/componets/form/title'
import Back from '@/app/componets/form/back'
export default function Login_menu(){
    return(
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="bg-black border border-white p-10">
                <Back href="/"></Back>
                <Title label="Zaloguj się"></Title>
                <p className="text-sm md:text-base text-red-500 max-w-fit mb-1 p-2 min-w-full text-center border border-red-500">Sprawdź, czy nazwa użytkownika<br></br> i hasło są poprawne</p>
                <form className="text-base md:text-2xl">
                    <Field label="Nazwa użytkownia" id='username' type='text'></Field>
                    <Field label="Hasło" id='password' type='password'></Field>
                    <div className="flex items-center justify-between text-sm md:text-base mb-3">
                        <Link href="/login/password-recovery" className="text-blue-500">Zapomniałeś hasła?</Link>
                    </div>
                    <div className="flex items-center justify-between">
                        <input className="bg-black p-3 border border-white w-full button" type="submit" value={'Zaloguj się'}/>
                    </div>
                </form>
            </div>
        </div>
    )
}