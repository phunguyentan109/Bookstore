var mongoose = require("mongoose");

var genreModel = new mongoose.Schema({
	name: String,
	description: String
})

module.exports = mongoose.model("Genre", genreModel);