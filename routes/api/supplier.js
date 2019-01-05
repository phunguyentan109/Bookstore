const express = require("express");
const router = express.Router({mergeParams: true});
const db = require("../../models");
const {getSuppliers} = require("../../helpers/supplier");

router.route("/").get(getSuppliers);

module.exports = router;
