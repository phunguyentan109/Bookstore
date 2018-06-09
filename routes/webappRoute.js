// =============================================================
// REQUIREMENT
// =============================================================
var express = require("express"),
	router 	= express.Router(),
	db 		= require("../models");

//ENVIRONMENT CONFIG
require('dotenv').config();

//IMAGE UPLOAD
var multer 	= require("multer");
var	storage = multer.diskStorage({
	filename: function(req, file, callback){
		//create new name of file
		callback(null, Date.now() + file.originalname);
	}
});
var	imageFilter = function(req, file, cb){
	if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
		return cb(new Error('Only image files are allowed!'), false);	
	}
	cb(null, true);
};
var	upload = multer({storage: storage, fileFilter: imageFilter});
var cloudinary = require("cloudinary");
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

// =============================================================
// ROUTE
// =============================================================
// CREATE BOOK - GET
router.get("/new", function(req, res){
	res.render("bookCreate");
});

// CREATE BOOK - POST
router.post("/", upload.single("image"), function(req, res){
	cloudinary.uploader.upload(req.file.path, function(result){
		req.body.book.image = result.secure_url;
		db.Book.create(req.body.book, function(err, newBook){
			if(err){
				console.log(err);
			} else {
				console.log(newBook);
				res.redirect("/store");
			}
		});
	})
});

module.exports = router;