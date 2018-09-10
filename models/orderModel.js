var mongoose = require("mongoose");

var orderModel = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	money: Number,
	status: String,
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Order", orderModel);