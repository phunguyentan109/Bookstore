var mongoose = require("mongoose");

mongoose.connect(process.env.DATABASEURL || process.env.LOCALDATABASEURL, { useNewUrlParser: true });
mongoose.Promise = Promise;

module.exports.User = require("./userModel");
module.exports.Book	= require("./bookModel");
module.exports.Cart	= require("./cartModel");
module.exports.Author = require("./authorModel");
module.exports.Comment = require("./commentModel");
module.exports.BookGenre = require("./linkBookGenre");
module.exports.Genre = require("./genreModel");
module.exports.Supplier = require("./supplierModel");
module.exports.Publisher = require("./publisherModel");
module.exports.Order = require("./orderModel");
module.exports.OrderBook = require("./linkOrderBook");
module.exports.Address = require("./addressModel");