// =============================================================
// REQUIREMENT
// =============================================================
var express 				= require("express"),
	router 					= express.Router(),
	db 						= require("../models"),
	passport				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	{getToken, transportMail} = require("../middleware/sendMail"),
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

router.get("/reset/:token", async(req, res) => {
	try{
		let user = await db.User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}});
		if(!user){
			return res.redirect("/oops");
		}
		res.render("forgot", {token: req.params.token, statusMsg: req.flash("error")});
	}catch(err){
		console.error(err);
	}
});

router.post("/reset/:token", async(req, res) => {
	try{
		let user = await db.User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}});
		if(!user){
			req.flash("error", "Password reset token is invalid or has expired.");
			return res.redirect("back");
		}
		if(req.body.password === req.body.confirm){
			user.setPassword(req.body.password, async(err) => {
				user.resetPasswordToken = undefined;
				user.resetPasswordExprires = undefined;
				await user.save();
				req.logIn(user, (err) => {
					let subject = `🎈 Kafka Bookstore Reset Password Successfully`;
					let text = `Hello,

This is a confirmation that the password for your account ${user.email} has just been changed.`
					transportMail(subject, text, user.email);
					return res.redirect("/");
				});
			});
			
		} else {
			req.flash("error", "Password do not match.");
			return res.redirect("back");
		}
	}catch(err){
		console.error(err);
	}
})

router.get("/oops", (req, res) => res.render("oops"));

module.exports = router;