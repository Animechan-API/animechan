const express = require("express");
const router = express.Router();

// controller files
const { index } = require("../controllers/index_controllers.js");

router.get("/", index);

module.exports = router