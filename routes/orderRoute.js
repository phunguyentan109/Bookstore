//=============================================================
// REQUIREMENT
//=============================================================
var express = require("express"),
	router	= express.Router(),
	db		= require("../models");

//=============================================================
// CONFIGURATION
//=============================================================
const {isLoggedIn} = require("../middleware/authentication");

//=============================================================
// ROUTES
//=============================================================
router.get("/", isLoggedIn, async(req, res) => {
	let orders = await db.Order.find({user: req.user._id});
	let details = [];
	for(let order of orders){
		let detail = await db.OrderBook.find({order: order}).populate("book").exec();
		details.push(detail);
	}
	res.render("order", {orders: orders, details: details});
})

router.get("/:id", isLoggedIn, async(req, res) => {
	try{
		let order = await db.Order.findById(req.params.id);
		let list = await db.OrderBook.find({order: req.params.id}).populate({path: "book", populate: {path: "author"}}).exec();
		res.render("order-detail", {order: order, list: list});
	}catch(err){
		console.log(err);
	}
})

module.exports = router;