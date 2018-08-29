var express = require("express"),
	router = express.Router(), 
	db = require("../models");

	router.get("/", async(req, res) =>{
		try{
			var list = await db.Book.find({}).populate("description").populate("author").populate("publisher").populate("supplier").lean().exec();
			for (let val of list) {val.genre = await db.BookGenre.find({book: val._id}).populate("genre").exec();}
			res.json(list);
		} catch(err){
			res.send(err);
		}
	});

module.exports = router;