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
		let newBook = await db.Book.create(req.body.book);
		let genreList = req.body.book.genre;
		for(let val of genreList){
			let bookgenre = {book: newBook._id, genre: val}
			await db.BookGenre.create(bookgenre);
		}
		res.json("Creating book successfully!");
	} catch(err) {
		res.send(err);
	}
}

exports.getBook = async(req, res) => {
	try{
		let list = await db.Book.findById(req.params.id).populate("author").populate("publisher").populate("supplier").populate("moreImage").lean().exec();
		list.genre = await db.BookGenre.find({book: list._id}).populate("genre").exec();
		res.json(list); 
	}catch(err){
		res.send(err);
	}
}

exports.getRawBook = async(req, res) => {
	try{
		let book = await db.Book.findById(req.params.id).populate("moreImage").lean().exec();
		book.genre = await db.BookGenre.find({book: book._id}).populate("genre").exec();
		res.json(book);
	} catch(err){
		res.send(err);
	}
}

exports.deleteBook = async(req, res) => {
	try{
		let book = await db.Book.findById(req.params.id);
		for(let id of book.moreImage){
			let img = await db.BookImage.findById(id);
			cloudinary.v2.uploader.destroy(img.cloudId);
		}
		cloudinary.v2.uploader.destroy(book.imageId);
		book.remove();
		res.json("Delete successfully!");
	} catch(err){
		res.send(err);
	}
}

exports.updateBook = async(req, res) => {
	try{
		await db.Book.findOneAndUpdate({"_id": req.params.id}, req.body.book, {new: true});
		await db.BookGenre.deleteMany({book: req.params.id});
		let genreList = req.body.book.genre;
		for(let each of genreList){
			let bookgenre = {book: req.params.id, genre: each}
			await db.BookGenre.create(bookgenre);
		}
		res.json("Update successfully!");
	} catch(err){
		res.send(err);
	}
}

module.exports = exports;