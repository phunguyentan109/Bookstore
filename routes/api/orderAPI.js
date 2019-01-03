const express = require("express");
const router = express.Router({mergeParms: true});
const {getOrders, createOrder} = require("../../helpers/order");

router.route("/").get(getOrders);

router.route("/new").post(createOrder);

module.exports = router;
