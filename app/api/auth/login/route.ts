import { connectToDB } from "@/utils/database";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/user';
   


export const POST = async (req:NextRequest,res:NextResponse) => {
	try {
    await connectToDB();
	const {email,password}=await req.json(); 
	const user=await User.findOne({email:email}); 
	// if(!user || user.provider==='google'){
	// 	const msg={
	// 		success:false,
	// 		message:"User Not exit or SignIn with google"
	// 	 }
	// 	return new Response(JSON.stringify(msg));
	// }
	const passwordCheck=await bcrypt.compare(password,user.password);
	if(!passwordCheck){
		const msg={
			success:false,
			message:"Invalid Credensial !"
		 }
		return new NextResponse(JSON.stringify(msg));
	}
	const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY as string, {
		expiresIn: 30 * 24 * 60 * 60 * 1000,
	})
	const jsnToken = {
		token: token,
		success: true,
		message: "Successfully Registered to Database"
	}
	return new NextResponse(JSON.stringify(jsnToken), { status: 201 });
	} catch (error) {
		console.log(error);
		const msg = {
			success: false,
			message: "Internal Server Error"
		}
		return new NextResponse(JSON.stringify(msg), { status: 500 })
	}
}