export const runtime = 'edge';
import busboy from "busboy";
import fs from 'fs';
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

 


export const POST = async (req: Request, { params }: { params: { id: string } }) => {

	let title: string | undefined = params.id as string;
	const headers: Record<string, string> = {};
	req.headers.forEach((value, key) => {
		headers[key] = value;
	})

	const busboyInstance = busboy({ headers })
	const stram = new WritableStream({
		write(chunk) {
			busboyInstance.write(chunk);
		},
		close() {
			busboyInstance.end();
		},
		abort(err) {
			busboyInstance.destroy(err);
		}
	});
	req.body?.pipeTo(stram);



	return new Promise((resolve, reject) => {

		busboyInstance.on('file', (fieldName, file, info) => {



			const { filename } = info;
			const extension = path.extname(filename);
			let result = title.concat(extension);
			const saveTo = path.join(process.cwd(), 'public/upload', result);
			const outStream = fs.createWriteStream(saveTo);
			file.pipe(outStream);
		});


		busboyInstance.on('close', () => {
			resolve(NextResponse.json({ success: true }));
		});

		busboyInstance.on('error', (err: any) => {
			reject(NextResponse.json({ success: false, error: err.message }, { status: 500 }));

		})
	})
}



const CHUNK_SIZE_IN_BYTES = 1000000;  

export const GET = async (req: NextRequest, { params }: { params: { id: string } }, res: NextApiResponse) => {
	try {
		let title: string | undefined = params.id as string;
		const header = new Headers(req.headers);
		const range = header.get('range');
		if (!range) {
			return NextResponse.json({ success: false, msg: "Range is not definde" }, { status: 400 });
		}
		let result = title.concat('.mp4');
		let videoPath = path.join(process.cwd(), 'public/upload', result);
		const videoSizeInBytes = fs.statSync(videoPath).size;
		const chunkStart = Number(range.replace(/\D/g, ""));
		const chunkEnd = Math.min(chunkStart + CHUNK_SIZE_IN_BYTES, videoSizeInBytes - 1);

		const contentLength = chunkEnd - chunkStart + 1;
		const headers = {
			"Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
			"Accept-Ranges": "bytes",
			"Content-Length": contentLength.toString(),
			"Content-Type": "video/mp4",
		};

		const videoStream = fs.createReadStream(videoPath, {
			start: chunkStart,
			end: chunkEnd,
		})



		return new NextResponse(videoStream as any, {
			status: 206,
			headers,
		});
	} catch (error) {
		console.error('Error streaming video:', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}


}
