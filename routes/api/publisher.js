const express = require("express");
const router = express.Router({mergeParams: true});
const db = require("../../models");
const {getPublishers} = require("../../helpers/publisher");

router.route("/").get(getPublishers);

module.exports = router;
