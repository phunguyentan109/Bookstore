var mongoose = require("mongoose");

var modelbookSchema = new mongoose.Schema({
	order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order"
	},
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book"
	},
	quantity: Number,
	price: Number
})

module.exports = mongoose.model("OrderBook", modelbookSchema);