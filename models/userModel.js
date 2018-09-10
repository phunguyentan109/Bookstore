var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	viewname: String,
	role: Number,
	address: String,
	city: String,
	country: String,
	otherAddress: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Address"
		}
	]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);