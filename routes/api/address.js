const express = require("express");
const router = express.Router({mergeParams: true});
const db = require("../../models");
const helpers = require("../../helpers/address");

router.route("/")
.get(helpers.getAddresses)
.post(helpers.createAddress);

router.route("/:id")
.get(helpers.getAddress)
.put(helpers.updateAddress)
.delete(helpers.deleteAddress);

module.exports = router;
