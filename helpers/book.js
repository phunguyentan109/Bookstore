var db = require("../models"),
	{upload, cloudinary} = require("../middleware/uploader");

exports.getBooks = async(req, res) => {
	try{
		let list = await db.Book.find().populate("author").populate("publisher").populate("supplier").lean().exec();
		for (let val of list) val.genre = await db.BookGenre.find({book: val._id}).populate("genre").exec();
		res.json(list);
	} catch(err){
		res.send(err);
	}
}

exports.createBook = async(req, res) => {
	try {
		let newBook = await db.Book.create(req.body);
		let genreList = req.body.genre;
		for(let val of genreList){
			let bookgenre = {book: newBook._id, genre: val}
			await db.BookGenre.create(bookgenre);
		}
		res.json(newBook._id);
	} catch(err) {
		res.send(err);
	}
}

exports.getBook = async(req, res) => {
	try{
		let list = await db.Book.findById(req.params.id).populate("author").populate("publisher").populate("supplier").lean().exec();
		list.genre = await db.BookGenre.find({book: list._id}).populate("genre").exec();
		res.json(list); 
	}catch(err){
		res.send(err);
	}
}

exports.deleteBook = async(req, res) => {
	try{
		let book = await db.Book.findById(req.params.id);
		book.remove();
		await db.BookGenre.deleteMany({book: req.params.id});
		res.json("Delete successfully!");
	} catch(err){
		res.send(err);
	}
}

exports.updateBook = async(req, res) => {
	try{
		await db.Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
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
}

exports.mainImage = async(req, res) => {
	try {
		let book = await db.Book.findById(req.body.bookid);
		if(req.file){
			let url = (await cloudinary.uploader.upload(req.file.path)).secure_url;
			book.image = url;
			book.save();
		}
		res.json("Upload main image successfully!");
	} catch(err) {
		res.send(err);
	}
}

exports.otherImage = async(req, res) => {
	try {
		let book = await db.Book.findById(req.body.bookid);
		if(req.files){
			for(let img of req.files){
				book.moreImage.push((await cloudinary.uploader.upload(img.path)).secure_url);
			}
		}
		book.save();
		res.json("Upload sub image successfully!");
	} catch(err) {
		res.send(err);
	}
};

module.exports = exports;