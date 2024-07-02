import jwt, { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";

export const getDataFromToken = (req: NextRequest) => {
	const secret = process.env.JWT_KEY;

	try {
		const header = new Headers(req.headers);
		const authorizationHeaderValue: string | null = header.get('authorization');
		if (authorizationHeaderValue) {
			const token = authorizationHeaderValue.split(' ')[1];
			if (token) {
				try {
					const decodedToken = jwt.verify(token, secret as string);
					if (typeof decodedToken !== 'string' && (decodedToken as JwtPayload).id) {
						return (decodedToken as JwtPayload).id;
					} else {
						console.log("Token does not contain an id");
					}
				} catch (err) {
					console.error("Failed to verify token:", err);
				}
			} else {
				console.log("token not found");
			}
		} else {
			console.log("No header avialabel");
		}
	} catch (error:any) {
		throw new Error(error);
		// console.log(error);
	}
}