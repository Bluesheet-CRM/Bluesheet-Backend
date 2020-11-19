const express = require("express");
const userAuthenticated = require("../middlewares/UserAuthenticated");
const userDataController = require("../controllers/userDataController");

const router = express.Router();

router.post("/user", [userAuthenticated], userDataController.createUser);

module.exports = router;