const express = require("express");
const router = express.Router({mergeParams: true});
const helpers = require("../../helpers/book");
const db = require("../../models");
const {needDestroy, uploadImg} = require("../../middleware/handleUpload");
const {upload, cloudinary} = require("../../middleware/uploader");

//=============================================================
// ROUTE
//=============================================================
router.route("/")
.get(helpers.getBooks)
.post(upload.fields([{name: "main"}, {name: "sub"}]), uploadImg, helpers.createBook);

router.route("/raw/:id")
.get(helpers.getRawBook)

router.route("/:id")
.get(helpers.getBook)
.delete(helpers.deleteBook)
.put(upload.fields([{name: "main"}, {name: "sub"}]), needDestroy, helpers.updateBook)

module.exports = router;
