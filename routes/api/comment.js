const express = require("express");
const router = express.Router({mergeParams: true});
const db = require("../../models");
const {createComment} = require("../../helpers/comment");

router.post("/new").post(createComment);

module.exports = router;
