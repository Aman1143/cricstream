import mongoose, { Schema, model, models } from "mongoose";

const gigSchema: Schema = new Schema({
	desc: {
		type: String
	},
	price: {
		type: String,
	},
	title:{
     type:String,
	},
	thumbNail: {
		public_id: String,
		url: String,
	},
	userId: {
		type: mongoose.Types.ObjectId,
		ref: "User"

	}
}, {
	timestamps: true
}
)

const Gig = models.Gig || model("Gig", gigSchema);
export default Gig;