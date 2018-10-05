var express = require("express"),
	router = express.Router(),
	db = require("../../models");

router.put("/:id", async(req, res) => {
	try{
		let newAdd = await db.Address.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.json(newAdd);
	} catch(err){
		res.send(err);
	}
})

module.exports = router;