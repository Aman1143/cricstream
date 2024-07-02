import ReviewCard from "@/layouts/ReviewCard"
import img1 from '@/public/assets/images/pic1.png'
import img2 from '@/public/assets/images/pic2.png'
import img3 from '@/public/assets/images/pic3.png'

const Review = () => {
	return (
		<div className=" min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
			<h1 className=" text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">
				Customer's Review
			</h1>
			<div className=" flex flex-col md:flex-row gap-5 mt-5">
				<ReviewCard img={img1.src} name="Sophia Azura" />
				<ReviewCard img={img2.src} name="John Deo" />
				<ReviewCard img={img3.src} name="Victoria Zoe" />
			</div>
		</div>
	)
}

export default Review