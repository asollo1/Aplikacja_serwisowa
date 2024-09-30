import Link from "next/link"
export default function Back(props: {href: string}){
    var arrow = '<='
    return(
        <Link href={props.href}>
            <div className="border border-white p-5 text-xl m-5">
                {arrow}
            </div>
        </Link>
    )
}