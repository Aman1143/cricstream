import Button from '@/layouts/Button'

const Main = () => {
	return (
		<div className=" min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-my_bg_image bg-cover bg-no-repeat ">
			<div className=" w-full lg:w-2/3 space-y-5">
				<h1 className=" text-backgroundColor font-semibold text-6xl">
					Elevate Your Self with Every Point of Cricket.
				</h1>
				<p className=" text-backgroundColor">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis et qui,
					maxime assumenda repellat corrupti officia dolorum delectus labore
					deleniti?
				</p>
				<div className=" lg:pl-44">
					<Button title="View More" />
				</div>
			</div>
		</div>
	)
}

export default Main