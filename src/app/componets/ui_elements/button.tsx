import '@/app/globals.css';
export default function Button(props: {content: any; onClick?: any;}){
    return (
        <button className="bg-black p-3 border border-white button" onClick={props.onClick} >{props.content}</button>
    );
}