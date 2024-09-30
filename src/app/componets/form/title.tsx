export default function Title(props: {label: string}) {
    return (<h1 className="text-2xl md:text-5xl font-extrabold mb-1 md:mb-3">{props.label}</h1>)
}