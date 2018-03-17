// =============================================================
// REQUIREMENT
// =============================================================
var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose	= require("mongoose");

// =============================================================
// CONFIGURATION
// =============================================================
// Database connection
mongoose.connect("mongodb://localhost/bookstore");

// General configuration
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// =============================================================
// ROUTES
// =============================================================
app.get("/", function(req, res){
	res.render("home");
});

app.get("/login", function(req, res){
	res.render("login");
})

app.listen(3000, function(req, res){
	console.log("Server is running...");
});

// =============================================================
// END
// =============================================================
