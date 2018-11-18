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
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// =============================================================
// ROUTE
// =============================================================
router.get("/", async(req, res) => {
	res.render("newlanding");
});

router.get("/login", function(req, res){
	res.render("login");
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) return next(err);
    if (!user) return res.redirect('/login');
    req.logIn(user, async function(err) {
      if (err) return next(err);
      req.session.amountCart = (await db.Cart.find({user: req.user._id})).length;
      return res.redirect('/');
    });
  })(req, res, next);
});

router.post("/register", function(req, res){
	var newUser = new db.User({
		username: req.body.username,
		email: req.body.email
	});
	db.User.register(newUser, req.body.password, function(err, user){
		if(err)
			return res.redirect("/register");
		passport.authenticate("local")(req, res, function(){
			return res.redirect("/");
		});
	})
})

router.get("/logout", function(req, res){
   req.logout();
   req.session.destroy();
   return res.redirect("/login");
});

router.get("/reset", async(req, res) => {
	try{
		// let user = await db.User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}});
		// if(!user){
		// 	req.flash("error", "Password reset token is invalid or has expired.");
		// 	return res.redirect("/oops");
		// }
		res.render("forgot", {token: req.params.token, statusMsg: req.flash("error")});
	}catch(err){
		console.error(err);
	}
});

router.get("/oops", (req, res) => res.render("oops"));

module.exports = router;