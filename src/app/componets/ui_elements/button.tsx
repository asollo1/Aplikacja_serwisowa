import '@/app/globals.css';
export default function Button(props: {content: any; onClick?: any;}){
    return (
        <button className="bg-white dark:bg-black p-3 border border-black dark:border-white button cursor-pointer" onClick={props.onClick} >{props.content}</button>
    );
}