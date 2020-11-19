const express = require("express");
const userAuthenticated = require("../middlewares/UserAuthenticated");
const pipeline = require("../controllers/pipeline");

const router = express.Router();

router.get("/pipelines", [userAuthenticated], pipeline.getOpportunities);

module.exports = router;