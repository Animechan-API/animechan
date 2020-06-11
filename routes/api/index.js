const express = require("express");
const router = express.Router();

// controller files
const { quotes, randomQuote } = require("../../controllers/api_controllers.js");

router.get("/quotes", quotes);
router.get("/quotes/random", randomQuote);

module.exports = router;
