// =============================================================
// REQUIREMENT
// =============================================================
require('dotenv').config()
var express 				= require("express"),
	app 					= express(),
	bodyParser 				= require("body-parser"),
	passport				= require("passport"),
	seedDB					= require("./seedDB");

var storeRoutes = require("./routes/storeRoute"),
	webappRoutes = require("./routes/webappRoute"),
	cartAPIRoutes = require("./routes/cartAPIRoute");

// =============================================================
// CONFIGURATION
// =============================================================
// General Configuration
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Load data
seedDB();

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
app.use("/books", storeRoutes);
app.use("/api/cart", cartAPIRoutes);

app.listen(process.env.LOCALHOST_SERVER, function(req, res){
	console.log("Server is running...");
});
