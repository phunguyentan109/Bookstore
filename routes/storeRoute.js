// =============================================================
// REQUIREMENT
// =============================================================
var express 				= require("express"),
	router 					= express.Router(),
	db 						= require("../models"),
	passport				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose");

// =============================================================
// CONFIGURATION
// =============================================================	
// Passport config
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// =============================================================
// ROUTE
// =============================================================

router.get("/", function(req, res){
	res.render("newlanding");
});

router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}));

router.post("/register", function(req, res){
	var newUser = new db.User({
		username: req.body.username,
		email: req.body.email
	});
	db.User.register(newUser, req.body.password, function(err, user){
		if(err)
			return res.redirect("/register");
		passport.authenticate("local")(req, res, function(){
			console.log("Register successfully!");
			res.redirect("/");
		});
	})
})

router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/login");
});

router.get("/store", async(req, res) => {
	try{
		let listBook = await db.Book.find({}).populate("author").exec();
		res.render("store", {list: listBook});
	} catch (err) { console.log(err); }
});

router.get("/cart", function(req, res){
	res.render("cart");
});

router.get("/store/:id", async(req, res) => {
	try {
		var data = await db.Book.findById(req.params.id).populate("author").populate("comment").populate({path: "comment", populate:{path: "user"}}).exec();
		if(data.description.length > 0){
		let para = data.description[0].split(" ");
		var short = para.length > 30 ? para.filter((val, index) => index <= 30).join(" ") : para.filter((val, index) => index <= para.length/2).join(" ");
		} else {
			var short = "There is no description.";
		}
		res.render("detail", {book: data, paraPlot: short});
	} catch(err){
		console.log(err);
	}
});

router.get("/cart/order", async(req, res) => {
	let userInfo = await db.User.findById(req.user._id).populate("otherAddress").exec();
	res.render("order", {user: userInfo});
})

module.exports = router;