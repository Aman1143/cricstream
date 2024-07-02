import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsTwitter, BsPinterest } from "react-icons/bs";
const Footer = () => {
	return (
		<div className=" bg-black text-white rounded-t-3xl mt-8 md:mt-0">
			<div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
				<div className=" w-full md:w-1/4">
					<h1 className=" font-semibold text-xl pb-4">FoodieWeb</h1>
					<p className=" text-sm">
						Immerse yourself in the symphony of cricket, where every match is canvas of unparalleled excitement.
					</p>
				</div>
				<div>
					<h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
					<nav className=" flex flex-col gap-2">
						<a
							className=" hover:text-brightColor transition-all cursor-pointer"
							href="/"
						>
							Gigs
						</a>
						<a
							className=" hover:text-brightColor transition-all cursor-pointer"
							href="/"
						>
							About
						</a>
						<a
							className=" hover:text-brightColor transition-all cursor-pointer"
							href="/"
						>
							Menu
						</a>
						<a
							className=" hover:text-brightColor transition-all cursor-pointer"
							href="/"
						>
							Reviews
						</a>
					</nav>
				</div>
				<div>
					<h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Menu</h1>
					<nav className=" flex flex-col gap-2">
						<a
							className=" hover:text-brightColor transition-all cursor-pointer"
							href="/"
						>
							Our Gigs
						</a>
						<a
							className=" hover:text-brightColor transition-all cursor-pointer"
							href="/"
						>
							Premium Menu
						</a>
					</nav>
				</div>
				<div>
					<h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
					<nav className=" flex flex-col gap-2">
						<a
							className=" hover:text-brightColor transition-all cursor-pointer"
							href="/"
						>
							CrciStream@email.com
						</a>
						<a
							className=" hover:text-brightColor transition-all cursor-pointer"
							href="/"
						>
							+64 958 248 966
						</a>
						<div className="flex gap-8 text-accent text-2xl mt-2 cursor-pointer">
							<FaFacebookF />
							<BsTwitter />
							<BsPinterest />
							<FaLinkedinIn />
						</div>
					</nav>
				</div>
			</div>

			<div>
				<p className=" text-center py-4">
					@copyright developed by
					<span className=" text-brightColor"> Invisible programmers</span> |
					All rights reserved
				</p>
			</div>
		</div>
	)
}

export default Footer