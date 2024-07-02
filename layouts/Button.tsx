interface Prop {
	title: string
}

const Button = (props:Prop) => {
	return (
		<div>
			<button className=" px-6 py-1 border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full">
				{props.title}
			</button>
		</div>
	)
}

export default Button