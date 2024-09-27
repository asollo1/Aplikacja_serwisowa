import '../globals.css';
export default function Button(props: {content: any;}){
    return (
        <button className="bg-black p-3 border border-white button" >{props.content}</button>
    );
}