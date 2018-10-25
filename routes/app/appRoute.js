var express = require("express"),
	router = express.Router(),
	db = require("../../models");

router.get("/", (req, res) => res.render("app/dashboard"));

router.get("/book", (req, res) => res.render("app/book"));

router.get("/customer", (req, res) => res.render("app/customer"));

router.get("/customer/:id", (req, res) => res.render("app/customer-address"));

module.exports = router;

