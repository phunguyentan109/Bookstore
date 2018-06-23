var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bookstore");
mongoose.Promise = Promise;

module.exports.User = require("./userModel");
module.exports.Book = require("./bookModel");
module.exports.Cart = require("./cartModel");