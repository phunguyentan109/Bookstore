
var db = require("../models");

exports.getAddresses = async(req, res) => {
	try{
		let addresses = await db.Address.find();
		res.json(addresses);
	} catch(err){
		res.send(err);
	}
}

exports.createAddress = async(req, res) => {
	try{
		let createdAdd = await db.Address.create(req.body.address);
		let customer = await db.User.findById(req.body.user);
		customer.address.push(createdAdd._id);
		customer.save();
		res.json(createdAdd);
	}catch(err){
		res.send(err);
	}
}

exports.getAddress = async(req, res) => {
	try{
		let address = await db.Address.findById(req.params.id);
		res.json(address);
	} catch(err) {
		res.send(err);
	}
}

exports.updateAddress = async(req, res) => {
	try{
		let newAdd = await db.Address.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json(newAdd);
	} catch(err){
		res.send(err);
	}
}

exports.deleteAddress = async(req, res) => {
	try{
		await db.Address.findByIdAndRemove(req.params.id);
		res.json({msg: "success"});
	} catch(err){
		res.send(err);
	}
}

module.exports = exports;
