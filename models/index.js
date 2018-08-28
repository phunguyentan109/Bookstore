var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bookstore");
mongoose.Promise = Promise;

module.exports.User = require("./userModel");
module.exports.Book	= require("./bookModel");
module.exports.Cart	= require("./cartModel");
module.exports.Author = require("./authorModel");
module.exports.Plot = require("./plotModel");
module.exports.Comment = require("./commentModel");
module.exports.BookGenre = require("./linkBookGenre");
module.exports.Genre = require("./genreModel");
module.exports.Supplier = require("./supplierModel");
module.exports.Publisher = require("./publisherModel")