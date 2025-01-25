export default function Field(props: {label: any; id: string; type: string; readonly?: boolean; value?: string}) {
    if (props.readonly){
        return (
            <div>
                <label className="block font-bold my-2" itemType={props.type}>
                    {props.label}
                </label>
                <input className="border border-black dark:border-white bg-white dark:bg-black p-3 min-w-full" id={props.id} type={props.type} name={props.id} defaultValue={props.value} required readOnly/>
            </div>
        )
    } else {
        return (
            <div>
                <label className="block font-bold my-2" itemType={props.type}>
                    {props.label}
                </label>
                <input className="border border-black dark:border-white bg-white dark:bg-black p-3 min-w-full" id={props.id} type={props.type} name={props.id} defaultValue={props.value} required/>
            </div>
        )
    }
}
