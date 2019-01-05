const express = require("express");
const router = express.Router({mergeParms: true});
const {getOrders, createOrder, updateOrder} = require("../../helpers/order");

router.route("/").get(getOrders);

router.route("/new").post(createOrder);

router.route("/:id").put(updateOrder);

module.exports = router;
