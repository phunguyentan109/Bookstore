var mongoose = require("mongoose");

var orderModel = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	receiver: String,
	address: String,
	city: String,
	country: String,
	money: Number,
	deliveryFast: {
		type: Boolean,
		default: false
	},
	status: {
		type: String,
		default: "Working"	
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Order", orderModel);