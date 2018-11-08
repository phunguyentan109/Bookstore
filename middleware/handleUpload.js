var {uploader, cloudinary} = require("./uploader"),
db = require("../models");

async function uploadImage(req, res, next){
	let book = JSON.parse(req.body.book);
	if(req.files.main){
		let main = await cloudinary.v2.uploader.upload(req.files.main[0].path);
		book.image = main.secure_url;
		book.imageId = main.public_id;
	}
	if(req.files.sub){
		if(req.params.id){
			let oldBook = await db.Book.findById(req.params.id);
			book.moreImage = oldBook.moreImage;
		}
		for(let img of req.files.sub){
			let sub = await cloudinary.v2.uploader.upload(img.path);
			let image = {cloudId: sub.public_id, url: sub.secure_url};
			let cloudImg = await db.BookImage.create(image);
			book.moreImage.push(cloudImg._id);
		}
	}
	req.body.book = book;
	next();
}

module.exports = {

	uploadImg: async(req, res, next) => await uploadImage(req, res, next),

	needDestroy: async(req, res, next) => {
		if(req.files.main){
			let book = JSON.parse(req.body.book);
			let oldBook = await db.Book.findById(req.params.id);
			cloudinary.v2.uploader.destroy(oldBook.imageId);
		}
		return uploadImage(req, res, next);
	}
}