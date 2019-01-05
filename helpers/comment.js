const db = require("../models");

exports.createComment = async(req, res) => {
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
		return res.json({user: req.user});
	} catch(err){
		return res.send(err);
	}
}
