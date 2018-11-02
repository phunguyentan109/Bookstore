var mongoose = require("mongoose");

var genreSchema = new mongoose.Schema({
	name: String,
	description: String
})

module.exports = mongoose.model("Genre", genreSchema);