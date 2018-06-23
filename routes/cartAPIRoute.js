var express = require("express"),
	router 	= express.Router(),
	db 		= require("../models");


router.get("/", function(req, res){
	if(req.user){
		db.Cart.find({user: req.user._id}).populate("book").exec()
		.then(function(carts){
			res.json(carts);
		})
		.catch(function(err){
			res.send(err);
		});
	}
});

//addInOne
router.post("/new", function(req, res){
	var newCart = new db.Cart({
		user: req.user,
		book: req.body.bookID,
		quantity: req.body.quantity
	});
	db.Cart.find({}, function(err, listCart){
		if(err){
			console.log(err);
		} else if(listCart.length == 0) {
			db.Cart.create(newCart, function(err, cartCreate){
				if(err){
					console.log(err);
				}
			});
		} else {
			db.Cart.find({user: req.user._id}).populate("book").exec(function(err, listBook){
				if(err){
					console.log(err);
				} else {
					var isExist = listBook.some(function(cart){
						return cart.book._id == req.body.bookID;
					});
					if(isExist){
						listBook.forEach(function(cart){
							if(cart.book._id == req.body.bookID){
								cart.quantity += Number(req.body.quantity);
								cart.save();
							}
						})
					} else {
						db.Cart.create(newCart, function(err, cartCreate){
							if(err){
								console.log(err);
							}
						});
					}
				}
			});
		}
	})
});

router.put("/:cartId", function(req, res){
	console.log(req.body.amount);
	db.Cart.findByIdAndUpdate(req.params.cartId, {quantity: req.body.amount})
	.then(function(updateCart){
		res.json(updateCart);
	})
	.catch(function(err){
		res.send(err);
	});
});

router.delete("/:cartId", function(req, res){
	db.Cart.findByIdAndRemove(req.params.cartId)
	.then(function(){
		res.json({});
	})
	.catch(function(err){
		res.send(err);
	});
});

module.exports = router;