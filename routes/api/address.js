const express = require("express");
const router = express.Router({mergeParams: true});
const db = require("../../models");
const {createAddress, getAddresses, getAddress, updateAddress, deleteAddress} = require("../../helpers/address");

router.route("/")
.get(getAddresses)
.post(createAddress);

router.route("/:id")
.get(getAddress)
.put(updateAddress)
.delete(deleteAddress);

module.exports = router;
