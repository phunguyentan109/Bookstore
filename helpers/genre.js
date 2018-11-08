var db = require("../models");

exports.getGenres = async(req, res) => {
	try{
		var list = await db.Genre.find({});
		res.json(list);
	} catch(err){
		res.send(err);
	}
};

exports.createGenre = async(req, res) => {
	try{
		await db.Genre.create(req.body);
		res.json("success");
	}catch(err){
		res.send(err);
	}
}

exports.deleteGenre = async(req, res) => {
	try{
		let genre = await db.Genre.findById(req.params.id);
		genre.remove();
		res.json("Delete successfully!");
	} catch(err){
		res.send(err);
	}
}

exports.updateGenre = async(req, res) => {
	try{
		await db.Genre.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json("Update successfully!");
	} catch(err){
		res.send(err);
	}
}

module.exports = exports;

