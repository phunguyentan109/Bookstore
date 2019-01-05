const db = require("../models");

exports.getAuthors = async(req, res) => {
    try{
		var list = await db.Author.find({});
		res.json(list);
	} catch(err){
		res.send(err);
	}
}
