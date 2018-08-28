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
// Landing - GET
router.get("/", function(req, res){
	res.render("newlanding");
});

router.get("/old", function(req, res){
	res.render("landing");
});

// Login - GET
router.get("/login", function(req, res){
	res.render("login");
});

// Login - POST
router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}));

// Register - POST
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

// Store - GET
router.get("/store", function(req, res){
	db.Book.find({}, function(err, list_books){
		if(err){
			console(err);
		} else {
			res.render("store", {list: list_books});
		}
	});
});

// Cart - GET
router.get("/cart", function(req, res){
	res.render("cart");
});

//Book Detail - GET
router.get("/store/:id", async(req, res) => {
	try {
		var data = await db.Book.findById(req.params.id).populate("description").populate("author").populate("comment").populate({path: "comment", populate:{path: "user"}}).exec();
		if(data.description.length > 0){
		let para = data.description[0].content.split(" ");
		var short = para.length > 30 ? para.filter((val, index) => index <= 30).join(" ") : para.filter((val, index) => index <= para.length/2).join(" ");
		} else {
			var short = "There is no description."
		}
		res.render("detail", {book: data, paraPlot: short});
	} catch(err){
		console.log(err);
	}
});

module.exports = router;