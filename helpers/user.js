var db = require("../models");

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

module.exports = exports;