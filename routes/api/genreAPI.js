var express = require("express"),
	router = express.Router(),
	helpers = require("../../helpers/genre"), 
	db = require("../../models");

router.route("/")
.get(helpers.getGenres)
.post(helpers.createGenre)

router.route("/:id")
.delete(helpers.deleteGenre)
.put(helpers.updateGenre)

module.exports = router;