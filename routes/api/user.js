const express = require("express");
const router = express.Router({mergeParams: true});
const db = require("../../models");
const helpers = require("../../helpers/user");

router.route("/").get(helpers.getUsers);

router.route("/forgot").post(helpers.recoverPassword);

router.route("/:id")
.get(helpers.getUser)
.delete(helpers.deleteUser)
.put(helpers.updateUser);

module.exports = router;
