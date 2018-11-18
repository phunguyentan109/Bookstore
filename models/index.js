var mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASEURL || process.env.LOCALDATABASEURL, { useNewUrlParser: true });
mongoose.Promise = Promise;

module.exports.User = require("./userSchema");
module.exports.Book	= require("./bookSchema");
module.exports.Cart	= require("./cartSchema");
module.exports.Author = require("./authorSchema");
module.exports.Comment = require("./commentSchema");
module.exports.BookGenre = require("./BookGenre");
module.exports.Genre = require("./genreSchema");
module.exports.Supplier = require("./supplierSchema");
module.exports.Publisher = require("./publisherSchema");
module.exports.Order = require("./orderSchema");
module.exports.OrderBook = require("./OrderBook");
module.exports.Address = require("./addressSchema");
module.exports.BookImage = require("./bookImageSchema");
