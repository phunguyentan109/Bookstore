//=============================================================
// REQUIREMENT
//=============================================================
var express = require("express"),
	router	= express.Router(),
	db		= require("../models");

//=============================================================
// ROUTES
//=============================================================
router.get("/", function(req, res){
	res.render("cart");
});

router.get("/complete", async(req, res) => {
	let userInfo = await db.User.findById(req.user._id).populate("address").exec();
	let books = await db.Cart.find({user: req.user._id}).populate("book").exec();
	res.render("complete", {user: userInfo, books: books});
});

module.exports = router;