var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bookstore");

module.exports.User = require("./userModel");
module.exports.Book = require("./bookModel");