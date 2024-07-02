import Button from "./Button";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import Link from 'next/link'
interface Prop {
	title: string,
	price: string
	img: string,
	cardId: string,
}
const MenuCard = (props: Prop) => {
	return (
		<div className="lg:w-2/3 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
			<img className=" rounded-xl h-80 w-screen" src={props.img}   alt="img" />
			<div className=" space-y-4">
				<h3 className=" font-semibold text-center text-xl pt-6">{props.title}</h3>
				<div className=" flex flex-row justify-center">
					<BsStarFill className=" text-brightColor" />
					<BsStarFill className=" text-brightColor" />
					<BsStarFill className=" text-brightColor" />
					<BsStarFill className=" text-brightColor" />
					<BsStarHalf className=" text-brightColor" />
				</div>
				<div className=" flex flex-row items-center justify-center gap-4">
					<h3 className=" font-semibold text-lg">${props.price}</h3>
					{/* <Button title="View Now" /> */}
					<Link href={`/gig/${props.title}?cardId=${props.cardId}`} className="px-6 py-1 border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full" >View Now</Link>
				</div>
			</div>
		</div>
	)
}

export default MenuCard