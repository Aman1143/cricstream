"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Auth = () => {
	const router = useRouter();
	const [isSignUp, setIsSignUp] = useState(true);
	const initialState = {
		username: "",
		password: "",
		email: "",
	};
	const [data, setData] = useState(initialState);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isSignUp) {
			let res = await axios.post('/api/auth/signup', data, {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				}
			})
			let result: any = await res.data;
			if (result.success) {
				localStorage.setItem('token', result.token);
				router.refresh();
				router.push('/');
			} else {
				console.log("something went wrong Try Again");
			}
		} else {
			let res = await axios.post('/api/auth/login', data, {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				}
			})
			let result: any = res.data;
			if (result.success) {
				localStorage.setItem('token', result.token);
				router.refresh();
				router.push('/');
			} else {
				console.log("something went wrong Try Again");
			}
		}
		resetForm();
	}

	const resetForm = () => {
		setData(initialState);
	}

	return (
		<section className="h-screen">
			<div className="container h-full px-6 py-24">
				<div
					className="flex h-full flex-wrap items-center justify-center lg:justify-evenly">
					<div className="mb-12 md:mb-0 md:w-8/12 lg:w-4/12">
						<img
							src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
							className="w-full"
							alt="Phone image" />
					</div>
					<div className="md:w-8/12 lg:ms-6 lg:w-4/12 relative">
						<form onSubmit={handleSubmit} encType="multipart/form-data">
							{
								isSignUp && (
									<div className="relative mb-6" data-twe-input-wrapper-init>
										<input
											type="text"
											name='username'
											value={data.username}
											className="peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 border-solid border-2 border-sky-300"
											id="exampleFormControlInput3"
											placeholder="Username"
											onChange={handleChange}
										/>

										<label
											htmlFor="exampleFormControlInput3"
											className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
										>Username
										</label>
									</div>
								)
							}
							<div className="relative mb-6" data-twe-input-wrapper-init>
								<input
									type="email"
									name='email'
									value={data.email}
									className="peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 border-solid border-2 border-sky-300"
									id="exampleFormControlInput3"
									placeholder="Email address"
									onChange={handleChange}
								/>

								<label
									htmlFor="exampleFormControlInput3"
									className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
								>Email address
								</label>
							</div>
							<div className="relative mb-6" data-twe-input-wrapper-init>
								<input
									type="password"
									name='password'
									value={data.password}
									className="peer block min-h-[auto] w-full rounded  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 border-solid border-2 border-sky-300"
									id="exampleFormControlInput33"
									placeholder="Password"
									onChange={handleChange}
								/>
								<label
									htmlFor="exampleFormControlInput33"
									className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary "
								>Password
								</label>
							</div>

							<button
								type="submit"
								className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal  shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-slate-600 text-cyan-100"
								data-twe-ripple-init
								data-twe-ripple-color="light">
								{isSignUp ? "SignUp" : "Login"}
							</button>
							<div
								className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
								<p
									className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
									OR
								</p>
							</div>
							<a
								className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong bg-custom-1"
								// style="background-color: #3b5998"
								href="#!"
								role="button"
								data-twe-ripple-init
								data-twe-ripple-color="light">
								<span
									className="me-2 fill-white [&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 320 512">
										<path
											d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
									</svg>
								</span>
								Continue with Facebook
							</a>
						</form>
					</div>
					<div className='absolute bottom-40 right-1/4'>
						<span className='cursor-pointer text-xs decoration-solid underline flex justify-end ' onClick={() => setIsSignUp((prev) => !prev)}>{isSignUp
							? "Already have an account ? Login"
							: "Don't have an account ? Sign up"}</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Auth