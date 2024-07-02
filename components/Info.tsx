"use client"
import MenuCard from "@/layouts/MenuCard"
import { useEffect, useState } from "react"
import axios from "axios"

const Info = () => {
	const [searchText, setSearchText] = useState("");
	const [allGigs, setAllGigs] = useState<any>([]);
	const [searchTimeOut, setSearchTimeOut] = useState<ReturnType<typeof setTimeout> | null>(null);
	const [searchResult, setSearchResult] = useState<any[]>([]);
	const [loading, setLoding] = useState(true);


	const fetchGigs = async () => {
		console.log(loading);
		try {
			let res = await axios.get('/api/add', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				}
			})
			let result: any = await res.data;
			if (result.success) {
				console.log(result.gigs);
				setAllGigs(result.gigs);
			} else {
				console.log("some error during loading data from server")
			}
		} catch (error) {
			console.log(error);
		} finally { 
			setLoding(false);
		}
	}

	useEffect(() => {
		fetchGigs();
	}, [])
	const filterGigs = (searchtext: string): any[] => {
		const regex = new RegExp(searchtext, "i");
		return allGigs.filter(
			(item: any) =>
				regex.test(item.title)
		)
	}
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (searchTimeOut) {
			clearTimeout(searchTimeOut);
		}

		setSearchText(e.target.value);
		const timeoutId = setTimeout(() => {
			const searchResult = filterGigs(e.target.value);
			setSearchResult(searchResult);
		}, 500);

		setSearchTimeOut(timeoutId);
	};
	return (

		<section className='feed '>
			<form className='relative w-full max-w-xl flex-center'>
				<input
					type='text'
					placeholder='Search for a title'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer'
				/>
			</form>


			{searchText ? (
				<div className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
					<h1 className=" text-4xl font-semibold text-center pt-24 pb-10">
						Our Gigs
					</h1>

					{
						searchResult && searchResult.length > 0 ? (
							searchResult.map((item: any) => (
								<div className=" flex flex-wrap gap-8 justify-center">
									<MenuCard img={item.thumbNail.url} title={item.title} price={item.price} cardId={item._id} />
								</div>
							))
						) : (
							<div className="rounded-md h-8 w-8 border-4 border-t-4 border-blue-500 animate-spin absolute mt-36"></div>
						)
					}
				</div>
			) : (
				<div className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
					<h1 className=" text-4xl font-semibold text-center pt-24 pb-10">
						Our Gigs
					</h1>
					<div className="flex flex-row w-auto">
						{
						loading ? (
							<div className="rounded-md h-8 w-8 border-4 border-t-4 border-blue-500 animate-spin absolute mt-36"></div>
						) : allGigs && allGigs.length > 0 ? (
							allGigs.map((item: any) => (
								<div key={item._id} className="flex flex-wrap gap-8 justify-center">
									<MenuCard img={item.thumbNail.url} title={item.title} price={item.price} cardId={item._id} />
								</div>
							))
						) : (
							<h1>No Posts !!</h1>
						)
					}
					</div>


				</div>
			)}

		</section>
	)
}

export default Info


