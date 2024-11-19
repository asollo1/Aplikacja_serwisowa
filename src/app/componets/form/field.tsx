export default function Field(props: {label: any; id: string; type: string;}) {
    return (
        <div>
            <label className="block font-bold my-2" itemType={props.type}>
                {props.label}
            </label>
            <input className="border border-white bg-black p-3 min-w-full" id={props.id} type={props.type} name={props.id} required/>
        </div>
    )
}
