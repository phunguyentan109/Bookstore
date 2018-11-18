var express = require("express"),
	router = express.Router(),
	db = require("../../models"),
	helpers = require("../../helpers/user");

router.route("/")
.get(helpers.getUsers)

router.route("/forgot")
.post(helpers.recoverPassword)

router.route("/:id")
.get(helpers.getUser)
.delete(helpers.deleteUser)
.put(helpers.updateUser)


module.exports = router;