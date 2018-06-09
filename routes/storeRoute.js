// =============================================================
// REQUIREMENT
// =============================================================
var express 				= require("express"),
	router 					= express.Router(),
	db 						= require("../models"),
	passport				= require("passport"),
	LocalStrategy 			= require("passport-local");

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

module.exports = router;