//=============================================================
// REQUIREMENT
//=============================================================
var express = require("express"),
	router 	= express.Router(),
	db 		= require("../models");

//=============================================================
// ROUTES
//=============================================================
router.get("/", async(req, res) => {
	try{
		let listBook = await db.Book.find({}).populate("author").exec();
		res.render("store", {list: listBook});
	} catch (err) { console.log(err); }
});

router.get("/:id", async(req, res) => {
	try {
		var data = await db.Book.findById(req.params.id).populate("author").populate("comment").populate({path: "comment", populate:{path: "user"}}).exec();
		if(data.description.length > 0){
		let para = data.description[0].split(" ");
		var short = para.length > 30 ? para.filter((val, index) => index <= 30).join(" ") : para.filter((val, index) => index <= para.length/2).join(" ");
		} else {
			var short = "There is no description.";
		}
		res.render("detail", {book: data, paraPlot: short});
	} catch(err){
		console.log(err);
	}
});

module.exports = router;