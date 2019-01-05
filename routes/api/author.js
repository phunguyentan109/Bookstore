const express = require("express");
const router = express.Router({mergeParams: true});
const db = require("../../models");
const {getAuthors} = require("../../helpers/author");

router.route("/").get(getAuthors);

module.exports = router;
