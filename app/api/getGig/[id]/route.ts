import Gig from "@/models/gig";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, { params }: { params: { id: string } }, res: NextResponse) => {
	try {
		await connectToDB();
		const cardId: string | undefined = params.id as string;
		const gig = await Gig.findById(cardId);
		return NextResponse.json({ success: true, gig }, { status: 200 });
	} catch (error) {
		console.error('Error streaming video:', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}