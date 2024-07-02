import { NextRequest, NextResponse } from "next/server";



export const middleware = async (req: NextRequest) => {
	const path = req.nextUrl.pathname;
	const header = new Headers(req.headers); 
	const authorizationHeaderValue = header.get('authorization');  
	const token = authorizationHeaderValue?.split(' ')[1]; 
	if (token) {
		return NextResponse.next();
	} else {
		return NextResponse.redirect(new URL('/auth',req.url));
	}
}

export const config = {
	matcher: [
		'/api/add', 
	]
}