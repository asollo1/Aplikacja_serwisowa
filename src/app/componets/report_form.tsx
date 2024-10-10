import Back from "./form/back"
import Title from "./form/title"
import Field from "./form/field"
import "../globals.css"
export default function Report_form(props: {back?: boolean;}) {
    var back = <div></div>
    if (props.back){
        var back = <Back href="/dashboard"></Back>
    }
    return( 
    <div className="w-full h-full flex justify-center items-center">
        {back}
        <div className="border border-white p-5">
            <Title label="Utwórz zgłoszenie"></Title>
            <form className="flex flex-col gap-4">
                <Field label="Tytuł" id='title' type='select'/>
                <label className="block font-bold mt-2" itemType="textarea">
                    Opis
                </label>
                <textarea className="border border-white bg-black p-3 min-w-full" id="description" name="description" required rows={4}/>
                <Field label="Nr sali" id='error_description' type='number'/>
                <button type='submit' className="button py-3 px-5 border border-white">
                    Wyślij
                </button>
            </form>
        </div>
    </div>
    )
}