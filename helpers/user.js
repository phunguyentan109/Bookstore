var db = require("../models"),
	{getToken, transportMail} = require("../middleware/sendMail");

require('dotenv').config();	

exports.getUsers = async(req, res) => {
	try{
		let users = await db.User.find().populate("address").exec();
		res.json(users.filter(val => val.role !== 0));
	}catch(err){
		res.send(err);
	}
}

exports.getUser = async(req, res) => {
	try{
		let userInfo = await db.User.findById(req.params.id).populate("address").exec();
		res.json(userInfo);
	}catch(err){
		res.send(err);
	}
}

exports.recoverPassword = async(req, res) => {
	try{
		let token = await getToken();
		let user = await db.User.findOne({email: req.body.email});
		if(!user) return res.json("noexist");
		user.resetPasswordToken = token;
		user.resetPasswordExpires = Date.now() + 3600000;
		user.save();
		let subject = `🔑 Kafka Bookstore Password Reset`;
		let text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.

Please click on the following link, or paste this into your browser to complete the process:
http://${req.headers.host}/reset/${token}

If you did not request this, please ignore this email and your password will remain unchanged.`;
		await transportMail(subject, text, user.email);
		res.json("sent");
	}catch(err){
		res.send(err);
	}
}

exports.deleteUser = async(req, res) => {
	try{
		let user = await db.User.findById(req.params.id);
		user.remove();
		res.json("success");
	} catch(err) {
		res.send(err);
	}
}

exports.updateUser = async(req, res) => {
	try {
		await db.User.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json("success");
	} catch(err) {
		res.send(err)
	}
}

module.exports = exports;