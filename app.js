require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");
const flash = require("connect-flash");
const passport = require("passport");
const site = require("./config/site");
const api = require("./config/api");
const appRoute = require("./routes/app/appRoute");

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
site.load().forEach(data => app.use(data.url, data.pathName));
api.load().forEach(data => app.use(data.url, data.pathName));
app.use("/app", appRoute);

app.listen(process.env.PORT || process.env.LOCALSERVER, function(req, res){
	console.log("SERVER IS INITIALIZING...");
});
