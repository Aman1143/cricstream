"use client"
import { rejects } from 'assert';
import axios, { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Data {
	title: string,
	price: string,
	desc: string,
	thumbNail: File | ArrayBuffer | string | undefined
}
const AddGig = () => {
	const router = useRouter();
	const [desc, setDesc] = useState("");
	const [price, setPrice] = useState("");
	const [title, setTitle] = useState("");
	const [image, setImage] = useState<File | Blob | string>();
	const [progress, setProgress] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const [previewImage, setPreviewImage] = useState<ArrayBuffer | string>();

	const data: Data = {
		title: "",
		price: "",
		desc: "",
		thumbNail: "",
	}

	// const handleThumbNail = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.files && e.target.files.length > 0) {
	// 		const file = e.target.files[0];
	// 		const reader = new FileReader();
	// 		reader.onload = () => {
	// 			if (reader.readyState === 2 && reader.result) {
	// 				// data.thumbNail = reader.result;
	// 				setImage(reader.result);
	// 				setPreviewImage(reader.result);
	// 			}
	// 		}
	// 		reader.readAsDataURL(file);
	// 	} else {
	// 		console.log("No file is there")
	// 	}
	// }
	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault(); 
			const formData = new FormData();
			if (!image) {
				console.log("Image is not found");
				return;
			}
			formData.set('file', image);
			formData.set('desc', desc);
			formData.set('title', title);
			formData.set('price', price);
			const res = await axios.post('/api/add', formData, {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				}
			})
			let result: any = res.data;
			if (result.success) { 
				router.push('/');
			} else {
				console.log("there is something error while Adding Gig");
			}
		} catch (error) {
			console.log(error);
		}

	}


	const handleSetFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			// setFile(e.target.files[0]);
			let res: any = await UploadFile(e.target.files[0]);
			if (res.success) {
				console.log(res);
				console.log("done from uploading");
			} else {
				console.log("something went wrong during uploading video");
			}
		} else {
			console.log("file is not upload from client side");
		}

	}

	const UploadFile = (file: File) => {
		return new Promise(async (resolve, reject) => {
			const fileData = new FormData();
			if (!file) {
				console.log("File is not found")
				return
			};
			setSubmitting(true);
			fileData.set("file", file);

			const config: AxiosRequestConfig = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: function (progressEvent: any) {
					const percentComplete = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					setProgress(percentComplete);
				}
			}
			try {
				const res = await axios.post(`/api/upload/${title}`, fileData, config);
				let result = await res.data;
				resolve(result);
			} catch (error) {
				resolve({ success: false });
			} finally {
				setSubmitting(false);
				setProgress(0);
			}
		})


	}
	return (
		<section className='h-screen'>
			<div className='container h-full px-6 py-24'>
				<div className='md:w-8/12 m-auto lg:w-4/12 w-2/3'>
					<form onSubmit={handleSubmit} encType="multipart/form-data">
						<div className="relative mb-6">
							<input type="text" className="peer block min-h-[auto] w-full rounded  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 border-solid border-2 border-sky-300 mt-3 text-custom-1" name="title" id="" placeholder='title'
								onChange={(e) => setTitle(e.target.value)}
							/>
							<label
								htmlFor="exampleFormControlInput3"
								className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
							>Title
							</label>
						</div>
						<div className="relative mb-6">
							<input type="text" className="peer block min-h-[auto] w-full rounded  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 border-solid border-2 border-sky-300 mt-3" name="price" id="" placeholder='$'
								onChange={(e) => setPrice(e.target.value)}
							/>
							<label
								htmlFor="exampleFormControlInput3"
								className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
							>Price
							</label>
						</div>
						<div className="relative mb-6">
							<textarea className="peer block min-h-[auto] w-full rounded  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 border-solid border-2 border-sky-300 mt-3" name="price" id="" placeholder='$'
								onChange={(e) => setDesc(e.target.value)}
							/>
							<label
								htmlFor="exampleFormControlInput3"
								className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
							>Discription
							</label>
						</div>
						<div className="relative mb-6">
							{
								previewImage && (
									<div className="shrink-0">
										<img id='preview_img' className="h-16 w-16 object-cover rounded-full" src={previewImage as string} alt="Current uploaded ThumNail" />
									</div>
								)
							}
							<label className="block">
								<span className="sr-only">Choose ThumbNail</span>
								<input type="file" className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      "
									onChange={(e) => {
										if (e.target.files && e.target.files.length > 0) {
											setImage(e.target.files[0]);
										}
									}}
								/>
							</label>
						</div>
						<div>
							<div className="relative mb-6">
								<label title="Click to upload" htmlFor="button2" className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
									<div className="w-max relative">
										<img className="w-12" src="https://www.svgrepo.com/show/485545/upload-cicle.svg" alt="file upload icon" width="512" height="512" />
									</div>
									<div className="relative">
										<span className="block text-base font-semibold relative text-blue-900 group-hover:text-blue-500">
											Upload a Video
										</span>
									</div>
								</label>
								<input hidden type="file" name="button2" id="button2" onChange={handleSetFile} />
							</div>
						</div>
						{submitting && <p>{progress}%</p>}
						<div>
							<button className="mt-3 px-6 py-1 border-2 border-brightColor text-brightColor bg-gray-400 hover:bg-brightColor hover:text-white transition-all rounded-full"
								disabled={submitting}
							>Submit</button>
						</div>
					</form>
				</div >
			</div >
		</section >
	)
}

export default AddGig