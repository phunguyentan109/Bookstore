var express = require("express"),
	router = express.Router(),
	db = require("../models");

router.get("/", (req, res) => res.render("app/dashboard"));

router.get("/book", async(req, res) => {
	res.render("app/book");
});

module.exports = router;

