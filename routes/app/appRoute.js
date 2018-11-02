var express = require("express"),
	router = express.Router(),
	db = require("../../models");

router.get("/", (req, res) => res.render("app/dashboard"));

router.get("/book", (req, res) => res.render("app/book"));

router.get("/book/new", async(req, res) => {
	let authors = await db.Author.find();
	let suppliers = await db.Supplier.find();
	let publishers = await db.Publisher.find();
	let genres = await db.Genre.find();
	res.render("app/new-book", {authors: authors, suppliers: suppliers, publishers: publishers, genres: genres});
});

router.get("/customer", (req, res) => res.render("app/customer"));

router.get("/customer/:id", (req, res) => res.render("app/customer-address"));

module.exports = router;

