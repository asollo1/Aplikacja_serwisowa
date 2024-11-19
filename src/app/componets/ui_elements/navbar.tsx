export default function Nav_item(props: { content: any; align: string;}){
    if (props.align == "left"){
        return (
            <div className="flex justify-normal items-center min-h-full w-1/2 p-5">
                {props.content}
            </div>
        );
    } else if (props.align == "right"){
        return (
            <div className="flex justify-end items-center min-h-full w-1/2 p-5">
                {props.content}
            </div>
        );
    } else if (props.align == "center"){
        return (
            <div className="flex justify-center items-center min-h-full w-1/2 p-5">
                {props.content}
            </div>
        );
    } else {
        return (
            <div className="flex items-center min-h-full w-1/2 p-5">
                {props.content}
            </div>
        );
    }
}