var db = require("../models"),
nodemailer = require("nodemailer"),
crypto  = require("crypto"),
async = require("async");

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

exports.recoverPassword = (req, res) => {
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, (err, buf) => {
				let token = buf.toString("hex");
				done(err, token);	
			});
		},
		function(token, done) {
			db.User.findOne({email: req.body.email}, function(err, user) {
				if(!user) res.json("noexist");
				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 3600000;
				user.save();
				done(err, token, user);
			});
		},
		function(token, user, done){
			let transport = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: process.env.GMAILUSER,
					pass: process.env.GMAILPWD
				}
			})
			let mailOptions = {
				to: user.email,
				from: process.env.GMAILUSER,
				subject: "🔑 Kafka Bookstore Password Reset",
				text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.

Please click on the following link, or paste this into your browser to complete the process:
http://${req.headers.host}/reset/${token}

If you did not request this, please ignore this email and your password will remain unchanged.`
			}
			transport.sendMail(mailOptions, (err) => {
				done(err, "done");
			})
		}
		], (err) => {
			if(err) return res.send(err);
			return res.json(`sent`);
		});
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