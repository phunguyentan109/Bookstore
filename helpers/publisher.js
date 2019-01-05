const db = require("../models");

exports.getPublishers = async(req, res) => {
    try{
		let list = await db.Publisher.find({});
		return res.json(list);
	} catch(err){
		return res.send(err);
	}
}
