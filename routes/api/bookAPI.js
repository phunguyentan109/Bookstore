var express = require("express"),
	router = express.Router(),
	helpers = require("../../helpers/book"),
	db = require("../../models");

const {upload, cloudinary} = require("../../middleware/uploader");

//=============================================================
// ROUTE
//=============================================================	
router.route("/")
.get(helpers.getBooks)
.post(upload.fields([{name: "main"}, {name: "sub"}]), helpers.createBook);

router.route("/main")
.put(upload.single("image"), helpers.mainImage)

router.route("/sub")
.put(upload.fields([{name: "images"}]), helpers.otherImage);

router.route("/:id")
.get(helpers.getBook)
.delete(helpers.deleteBook)
.put(helpers.updateBook)

module.exports = router;