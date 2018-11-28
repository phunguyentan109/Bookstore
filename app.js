require('dotenv').config()
var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	db			= require("./models"),
	flash		= require("connect-flash"),
	passport	= require("passport");

var cartAPI			= require("./routes/api/cartAPI"),
	commentAPI 		= require("./routes/api/commentAPI"),
	bookAPI			= require("./routes/api/bookAPI"),
	authorAPI		= require("./routes/api/authorAPI"),
	genreAPI		= require("./routes/api/genreAPI"),
	supplierAPI		= require("./routes/api/supplierAPI"),
	publisherAPI	= require("./routes/api/publisherAPI"),
	userAPI			= require("./routes/api/userAPI"),
	addressAPI		= require("./routes/api/addressAPI"),
	orderAPI		= require("./routes/api/orderAPI"),
	orderBookAPI	= require("./routes/api/orderBookAPI");

var	appRoute 		= require("./routes/app/appRoute");

var	storeRoutes = require("./routes/storeRoute"),
	baseRoute 	= require("./routes/baseRoute"),
	cartRoute 	= require("./routes/cartRoute"),
	orderRoute 	= require("./routes/orderRoute");

//=============================================================
// CONFIGURATION
//=============================================================

// General Configuration
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(flash());


// Authentication
app.use(require("express-session")({
	secret: "me",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(async function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.cartSession = req.session.amountCart;
	next();
});

//=============================================================
// ROUTES
//=============================================================

// WEBSITE
app.use("/", baseRoute);
app.use("/store", storeRoutes);
app.use("/order", orderRoute);
app.use("/cart", cartRoute);

// WEBAPP
app.use("/app", appRoute);

// API
app.use("/api/book", bookAPI);
app.use("/api/cart", cartAPI);
app.use("/api/comment", commentAPI);
app.use("/api/author", authorAPI);
app.use("/api/genre", genreAPI);
app.use("/api/publisher", publisherAPI);
app.use("/api/supplier", supplierAPI);
app.use("/api/address", addressAPI);
app.use("/api/order", orderAPI);
app.use("/api/user", userAPI);
app.use("/api/orbook", orderBookAPI);

app.listen(process.env.PORT || process.env.LOCALSERVER, function(req, res){
	console.log("SERVER IS INITIALIZING...");
});
