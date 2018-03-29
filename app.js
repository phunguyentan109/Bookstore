// =============================================================
// REQUIREMENT
// =============================================================
var express 				= require("express"),
	app 					= express(),
	bodyParser 				= require("body-parser"),
	mongoose				= require("mongoose"),
	passport				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose"),
	User 					= require("./models/userModel");

// =============================================================
// CONFIGURATION
// =============================================================
// DATABASE CONNECTION
mongoose.connect("mongodb://localhost/bookstore");

// GENERAL CONFIGURATION
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// AUTHENTICATION
app.use(require("express-session")({
	secret: "me",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =============================================================
// ROUTES
// =============================================================
app.get("/", function(req, res){
	res.render("landing");
});

//REGISTER ROUTE - POST
app.post("/register", function(req, res){
	var newUser = new User({
		username: req.body.username,
		email: req.body.email
	});
	User.register(newUser, req.body.password, function(err, user){
		if(err)
			return res.redirect("/register");
		passport.authenticate("local")(req, res, function(){
			console.log("Register successfully!");
			res.redirect("/");
		});
	})
})

//LOGIN ROUTE - GET
app.get("/login", function(req, res){
	res.render("login");
})

//LOGIN ROUTE - POST
app.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}));

app.listen(3000, function(req, res){
	console.log("Server is running...");
});

// =============================================================
// END
// =============================================================
