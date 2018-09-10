var mongoose = require("mongoose");

var addressModel = new mongoose.Schema({
	receiver: String,
	address: String,
	city: String,
	country: String
})

module.exports = mongoose.model("Address", addressModel);