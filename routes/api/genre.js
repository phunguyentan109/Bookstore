const express = require("express");
const router = express.Router({mergeParams: true});
const helpers = require("../../helpers/genre");
const db = require("../../models");

router.route("/")
.get(helpers.getGenres)
.post(helpers.createGenre);

router.route("/:id")
.delete(helpers.deleteGenre)
.put(helpers.updateGenre);

module.exports = router;
