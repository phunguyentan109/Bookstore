var mongoose = require("mongoose");

var plotSchema = new mongoose.Schema({
	position: Number,
	content: String
});

module.exports = mongoose.model("Plot", plotSchema);