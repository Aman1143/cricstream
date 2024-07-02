import { getDataFromToken } from "@/helpers/getData";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET=async(req:NextRequest)=>{
	try {
		await connectToDB();
		const userId = getDataFromToken(req);
		if (!userId) {
			const msg = {
				message: "token not found",
				success: false,
			}
			return new NextResponse(JSON.stringify(msg))
		}
		const user = await User.findOne({ _id: userId }).select("-password");
		const data = {
			message: "User found",
			user: user,
			success: true,
		}
		return new NextResponse(JSON.stringify(data));
	} catch (error) {
		const msg = {
			message: "Internal Server Error",
			success: false,
		}
		return new NextResponse(JSON.stringify(msg))
	}
}