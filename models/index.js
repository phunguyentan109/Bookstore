var mongoose = require("mongoose");

// console.log(process.env.DATABASEURL)
// mongoose.connect("mongodb://localhost/bookstore", { useNewUrlParser: true });
mongoose.connect(process.env.DATABASEURL || process.env.LOCALDATABASEURL, { useNewUrlParser: true });
// mongoose.connect("mongodb://kyle:kyle123@ds251902.mlab.com:51902/bookstore", { useNewUrlParser: true });
// mongodb://kyle:kyle123@ds251902.mlab.com:51902/bookstore
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