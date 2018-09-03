var express = require("express"),
	router = express.Router(),
	bodyParser = require("body-parser"), 
	db = require("../models");

//ENVIRONMENT CONFIG
require('dotenv').config();
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

//=============================================================
// ROUTE
//=============================================================	

router.get("/", async(req, res) =>{
	try{
		let list = await db.Book.find({}).populate("author").populate("publisher").populate("supplier").lean().exec();
		for (let val of list) {val.genre = await db.BookGenre.find({book: val._id}).populate("genre").exec();}
		res.json(list);
	} catch(err){
		res.send(err);
	}
});

router.get("/:id", async(req,res) =>{
	try{
		let list = await db.Book.findById(req.params.id).populate("author").populate("publisher").populate("supplier").lean().exec();
		list.genre = await db.BookGenre.find({book: list._id}).populate("genre").exec();
		res.json(list); 
	}catch(err){
		res.send(err);
	}
})

router.post("/new", upload.single("image"), async(req, res) => {
	try {
		req.body.book.image = (await cloudinary.uploader.upload(req.file.path)).secure_url;
		var newBook = await db.Book.create(req.body.book);
		let genreList = JSON.parse(req.body.genre);
		for(let val of genreList){
			let bookgenre = {book: newBook._id, genre: val}
			await db.BookGenre.create(bookgenre);
		}
		res.status(201).json(newBook);
	} catch(err) {
		res.send(err);
	}
})

router.put("/:id", upload.single("image"), async(req, res) => {
	try{
		if(req.file){
			var result = await cloudinary.uploader.upload(req.file.path);
			req.body.book.image = result.secure_url;	
		}
		await db.Book.findByIdAndUpdate(req.params.id, req.body.book, {new: true});
		await db.BookGenre.deleteMany({book: req.params.id});
		let genreList = JSON.parse(req.body.genre);
		for(let each of genreList){
			let bookgenre = {book: req.params.id, genre: each}
			await db.BookGenre.create(bookgenre);
		}
		res.json("Update successfully!");
	} catch(err){
		res.send(err);
	}
})

router.delete("/:id", async(req, res) => {
	try{
		await db.Book.findByIdAndRemove(req.params.id);
		await db.BookGenre.deleteMany({book: req.params.id});
		res.json("Delete successfully!");
	} catch(err){
		res.send(err);
	}
});

module.exports = router;