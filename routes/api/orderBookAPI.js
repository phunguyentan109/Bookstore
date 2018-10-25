var express = require("express"),
	router = express.Router(),
	db = require("../../models");

router.get("/:id", async(req, res) => {
	try{
		let list = await db.OrderBook.find({order: req.params.id}).populate("book").exec();
		res.json(list);
	}catch(err){
		res.send(err);
	}
})

router.post("/new", async(req, res) => {
	try{
		let orderbook = await db.OrderBook.create(req.body);
		console.log(orderbook);
		res.json(orderbook);
	}catch(err){
		res.send(err);
	}
})

module.exports = router;