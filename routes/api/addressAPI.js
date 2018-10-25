var express = require("express"),
	router = express.Router(),
	db = require("../../models"),
	helpers = require("../../helpers/address");

router.route("/")
.get(helpers.getAddresses)
.post(helpers.createAddress)

router.route("/:id")
.get(helpers.getAddress)
.put(helpers.updateAddress)
.delete(helpers.deleteAddress);

module.exports = router;