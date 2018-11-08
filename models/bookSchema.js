var mongoose = require("mongoose"),
db = require("./index"),
{upload, cloudinary} = require("../middleware/uploader");

var bookSchema = new mongoose.Schema({
	image: String,
	imageId: String,
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
	moreImage: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "BookImage"
	}
	]
});

bookSchema.pre("remove", async function() {
	await db.BookImage.deleteMany({"_id" : {$in : this.moreImage}})
	await db.Comment.deleteMany({"_id" : {$in : this.comment}});
	await db.BookGenre.deleteMany({"book": this._id});
});

module.exports = mongoose.model("Book", bookSchema);