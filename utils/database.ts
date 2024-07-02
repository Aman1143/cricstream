import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;
export const connectToDB = async () => { 
	mongoose.set('strictQuery', true); 
	if (isConnected) {
		console.log("MongoDB is Already Connected");
		return;
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI as string, {
			dbName: "cricStream",
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions)
		isConnected = true;
		console.log("MongoDb is Connected");
	} catch (error) {
		console.log(error)
	}
}

