var mongoose = require("mongoose"),
	db = require("./index");

var bookSchema = new mongoose.Schema({
	image: String,
	name: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Author"
	},
	isbn: String,
	description: [],
	price: Number,
	discount: Number,
	discountPrice: String,
	rating: String,
	comment: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	supplier: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Supplier"
	},
	publisher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Publisher"
	},
	pageNumber: String,
	cover: String,
	publishDate: String,
	language: String,
	dateCreated: String,
	dateModified: String,
	deliveryFast: Boolean,
	amount: Number,
	moreImage: []
});

bookSchema.pre("remove", async function() {
	await db.Comment.deleteMany({"_id" : { $in : this.comment }});
});

module.exports = mongoose.model("Book", bookSchema);