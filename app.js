// =============================================================
// REQUIREMENT
// =============================================================
require('dotenv').config()
var express 				= require("express"),
	app 					= express(),
	bodyParser 				= require("body-parser"),
	passport				= require("passport");
	// seedDB					= require("./seedDB");

var cartAPI			= require("./routes/api/cartAPIRoute"),
	commentAPI 		= require("./routes/api/commentAPIRoute"),
	bookAPI			= require("./routes/api/bookAPIRoute"),
	authorAPI		= require("./routes/api/authorAPIRoute"),
	genreAPI		= require("./routes/api/genreAPIRoute"),
	supplierAPI		= require("./routes/api/supplierAPIRoute"),
	publisherAPI	= require("./routes/api/publisherAPIRoute"),
	userAPI			= require("./routes/api/userAPIRoute"),
	addressAPI		= require("./routes/api/addressAPIRoute"),
	storeRoutes 	= require("./routes/storeRoute"),
	appRoute 		= require("./routes/appRoute");

// =============================================================
// CONFIGURATION
// =============================================================
// General Configuration
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Load data
// seedDB();

// Authentication
app.use(require("express-session")({
	secret: "me",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// =============================================================
// ROUTES
// =============================================================
app.use("/", storeRoutes);
app.use("/app", appRoute);

//API ROUTE
app.use("/api/book", bookAPI);
app.use("/api/cart", cartAPI);
app.use("/api/comment", commentAPI);
app.use("/api/author", authorAPI);
app.use("/api/genre", genreAPI);
app.use("/api/publisher", publisherAPI);
app.use("/api/supplier", supplierAPI);
app.use("/api/address", addressAPI);
app.use("/api/user", userAPI);

app.listen(process.env.PORT || process.env.LOCALSERVER, function(req, res){
	console.log("SERVER IS INITIALIZING...");
});
