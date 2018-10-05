var express = require("express"),
	router = express.Router(),
	db = require("../../models");

router.get("/", async(req, res) => {
	try{
		let userInfo = await db.User.findById(req.user._id).populate("otherAddress").exec();
		res.json(userInfo);
	}catch(err){
		res.send(err);
	}
});

module.exports = router;