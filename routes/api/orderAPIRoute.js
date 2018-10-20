var express = require("express"),
	router = express.Router(),
	db = require("../../models");

router.post("/new", async(req, res) => {
	try{
		let order = req.body;
		order.user = req.user._id;
		let newOrder = await db.Order.create(order);
		res.json(newOrder._id);
	} catch(err){
		res.send(err);
	}
})

module.exports = router;