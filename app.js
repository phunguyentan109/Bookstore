// =============================================================
// REQUIREMENT
// =============================================================
require('dotenv').config()
var express 				= require("express"),
	app 					= express(),
	bodyParser 				= require("body-parser"),
	passport				= require("passport");
	// seedDB					= require("./seedDB");

var storeRoutes 	= require("./routes/storeRoute"),
	cartAPI			= require("./routes/cartAPIRoute"),
	commentAPI 		= require("./routes/commentAPIRoute"),
	bookAPI			= require("./routes/bookAPIRoute"),
	authorAPI		= require("./routes/authorAPIRoute"),
	genreAPI		= require("./routes/genreAPIRoute"),
	supplierAPI		= require("./routes/supplierAPIRoute"),
	publisherAPI	= require("./routes/publisherAPIRoute"),
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

app.listen(process.env.LOCALHOST_SERVER || 3000, function(req, res){
	console.log("SERVER IS INITIALIZING...");
});
