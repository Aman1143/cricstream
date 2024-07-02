import MenuCard from "@/layouts/MenuCard"
import img1 from '@/public/assets/images/img1.jpeg'
import img2 from '@/public/assets/images/img2.jpeg'
import img3 from '@/public/assets/images/img3.jpeg'

const Menu = () => {
	return (
		<div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
			<h1 className=" text-4xl font-semibold text-center lg:pt-8 pt-24 pb-10">
				Premium Menu
			</h1>

			<div className=" flex flex-wrap gap-8 justify-center">
				<MenuCard img={img1.src} title="The King" price="18.99" />
				<MenuCard img={img2.src} title="Spidy" price="14.99" />
				<MenuCard img={img3.src} title="The Reaction" price="13.45" />
			</div>
		</div>
	)
}

export default Menu

