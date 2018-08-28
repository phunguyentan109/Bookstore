var express = require("express"),
	router	= express.Router(),
	db 		= require("../models");

router.post("/new", async(req, res) =>{
	try{
		var cmt = new db.Comment({
			user: req.user._id,
			title: req.body.cmtTitle,
			rate: req.body.rating,
			review: req.body.reviews
		});
		let newCmt = await db.Comment.create(cmt);
		let book = await db.Book.findById(req.body.bookID);
		book.comment.push(newCmt._id);
		book.save();
		res.send({user: req.user})
	} catch(err){
		console.log(err);
	}
});

module.exports = router;