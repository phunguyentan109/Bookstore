const db = require("../models");

exports.getCarts = async(req, res) => {
    try{
		if(req.user){
			let listCart = await db.Cart.find({user: req.user._id}).populate({path:"book", populate: {path: "author"}}).exec()
			res.json(listCart);
		}
	} catch(err){
		res.send(err);
	}
}

exports.addCart = async(req, res) => {
    try {
		let newCart = new db.Cart({user: req.user, book: req.body.bookID, quantity: req.body.quantity});
		let listCart = await db.Cart.find({user: req.user._id}).populate("book").exec();
		if(listCart.length == 0){
			await db.Cart.create(newCart);
		} else {
			let isExist = listCart.some(cart => cart.book._id == req.body.bookID);
			if(isExist) {
				listCart.forEach(cart => {
					if(cart.book._id == req.body.bookID){
						cart.quantity += Number(req.body.quantity);
						cart.save();
					}
				})
			} else {
				await db.Cart.create(newCart);
			}
		}
	} catch(err) {
		res.send(err);
	}
}

exports.updateBookCart = async(req, res) => {
    try{
		await db.Cart.findByIdAndUpdate(req.params.cartId, {quantity: req.body.amount});
		res.json("Update cart successfully!");
	}catch(err){
		res.send(err);
	}
}

exports.removeBookCart = async(req, res) => {
    try{
		await db.Cart.findByIdAndRemove(req.params.cartId);
		res.json("Remove cart successfully!");
	} catch(err){
		res.send(err);
	}
}

exports.clearCart = async(req, res) => {
    try {
		await db.Cart.deleteMany({});
		res.json("Clear");
	} catch(err) {
		res.send(err);
	}
}
