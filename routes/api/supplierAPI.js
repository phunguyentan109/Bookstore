var express	 = require("express"),
	router	 = express.Router(),
	db		 = require("../../models");

router.get("/", async(req, res) => {
	try{
		var list = await db.Supplier.find({});
		res.json(list);
	} catch(err){
		res.send(err);
	}
});

module.exports = router;