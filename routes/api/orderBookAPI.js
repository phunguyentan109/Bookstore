const express = require("express");
const router = express.Router({mergeParams: true});
const db = require("../../models");
const {createOrderBook, getOrderBook} = require("../../helpers/order-book");

router.route("/:order_id").get(getOrderBook);

router.route("/new").post(createOrderBook);

module.exports = router;
