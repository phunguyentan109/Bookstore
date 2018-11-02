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
		let book = JSON.parse(req.body.book);
		book.moreImage = [];
		if(req.files){
			let main = await cloudinary.v2.uploader.upload(req.files.main[0].path);
			book.image = main.secure_url;
			book.imageId = main.public_id;
			for(let img of req.files.sub){
				let sub = await cloudinary.v2.uploader.upload(img.path);
				let image = {cloudId: sub.public_id, url: sub.secure_url};
				book.moreImage.push(image);
			}
		}
		let newBook = await db.Book.create(book);
		let genreList = book.genre;
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

module.exports = exports;