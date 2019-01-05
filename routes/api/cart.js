const express = require("express");
const router = express.Router({mergeParams: true});
const db = require("../../models");
const {getCarts, addCart, removeBookCart, updateBookCart, clearCart} = require("../../helpers/cart");

router.route("/")
.get(getCarts)
.post(clearCart);

router.route("/new").post(addCart);

router.route("/:cartId")
.delete(removeBookCart)
.put(updateBookCart);

module.exports = router;
