import '../../globals.css'
import Back from '@/app/componets/form/back'
import Field from '@/app/componets/form/field'
import Title from '@/app/componets/form/title'
export default function Login_menu(){
    return(
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="bg-black border border-white p-10 ">
                <Back href="/login"></Back>
                <Title label="Odzyskiwanie hasła"></Title>
                <form className="text-base md:text-2xl">
                    <Field label="Nazwa użytkownia" id='username' type='text'></Field>
                    <div className="flex items-center justify-between mt-5">
                        <input className="bg-black p-3 border border-white w-full button" type="submit" value={'Wyślij zgłoszenie'}/>
                    </div>
                </form>
            </div>
        </div>
    )
}