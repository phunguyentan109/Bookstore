const db = require("../models");

exports.getSuppliers = async(req, res) => {
    try{
		let list = await db.Supplier.find({});
		return res.json(list);
	} catch(err){
		return res.send(err);
	}
}
