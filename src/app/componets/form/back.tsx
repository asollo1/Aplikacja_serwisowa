import Link from "next/link"
export default function Back(props: {href: string}){
    var arrow = '<='
    return(
        <Link href={props.href}>
            <div className="border border-white p-2 text-sm mb-2 max-w-fit absolute left-5 top-5">
                {arrow}
            </div>
        </Link>
    )
}