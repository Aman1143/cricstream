import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import Gig from '@/models/gig'
import cloudinary from '@/helpers/cluody'
import { getDataFromToken } from "@/helpers/getData";

export const POST = async (req: NextRequest, res: NextResponse) => {
	try {
		await connectToDB();
		const userId = await getDataFromToken(req);  
		const formData = await req.formData();
		const desc = formData.get('desc') as string;
		const price = formData.get('price') as string;
		const title = formData.get('title') as string;
		const file = formData.get('file') as File; 
		const fileBuffer = await file.arrayBuffer();
		const mimeType = file.type;
		const encoding = "base64";
		console.log(title);
		const base64Data = Buffer.from(fileBuffer).toString("base64");

		const thumbNail = "data:" + mimeType + ";" + encoding + "," + base64Data; 


		const uploadResponse = await cloudinary.uploader.upload(thumbNail, {
			upload_preset: 'iaym6liq'
		})

		const gig = await Gig.create({
			desc: desc,
			price: price,
			title: title,
			thumbNail: {
				public_id: uploadResponse.public_id,
				url: uploadResponse.secure_url,
			},
			userId: userId,
		})
		await gig.save();
		return new NextResponse(JSON.stringify({ success: true }));

	} catch (error) {
		console.log(error);
		const msg = {
			success: false,
			message: "Internal Server Error"
		}
		return new NextResponse(JSON.stringify(msg), { status: 500 })
	}
}

export const GET = async () => {
	try {
		await connectToDB();
		const gigs = await Gig.find().limit(6); 
		const res = {
			success: true,
			gigs,
		}
		return new NextResponse(JSON.stringify(res),)
	} catch (error) {
		console.log(error);
		const msg = {
			success: false,
			message: "Internal Server Error"
		}
		return new NextResponse(JSON.stringify(msg), { status: 500 })
	}
}
