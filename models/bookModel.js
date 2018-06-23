var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
	image: String,
	name: String,
	author: String,
	isbn: String,
	price: Number,
	discount: Number,
	discountPrice: String,
	rating: String,
	comment: String,
	publisher: String,
	pageNumber: String,
	cover: String,
	publishDate: String,
	language: String,
	dateCreated: String,
	dateModified: String,
	deliveryFast: Boolean
});

module.exports = mongoose.model("Book", bookSchema);