var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
	image: String,
	name: String,
	author: String,
	isbn: String,
	price: String,
	discount: String,
	discountPrice: String,
	rating: String,
	comment: String,
	publisher: String,
	pageNumber: String,
	cover: String,
	publishDate: String,
	language: String,
	dateCreated: String,
	dateModified: String
});

module.exports = mongoose.model("Book", bookSchema);