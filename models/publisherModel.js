var mongoose = require("mongoose");

var publisherModel = new mongoose.Schema({
	name: String,
	description: String
});

module.exports = mongoose.model("Publisher", publisherModel);