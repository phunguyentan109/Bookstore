var express = require("express"),
	router = express.Router(),
	db = require("../../models"),
	helpers = require("../../helpers/user");

router.route("/")
.get(helpers.getUsers)

router.route("/:id")
.get(helpers.getUser)

module.exports = router;