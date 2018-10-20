var express = require("express"),
	router = express.Router(),
	db = require("../../models");

router.get("/:id", async(req, res) => {
	try{
		let address = await db.Address.findById(req.params.id);
		res.json(address)
	} catch(err) {
		res.send(err);
	}
})

router.put("/:id", async(req, res) => {
	try{
		let newAdd = await db.Address.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json(newAdd);
	} catch(err){
		res.send(err);
	}
})

module.exports = router;