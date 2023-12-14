const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const payment = require("../controllers/stripeControllers");

router.get('/', payment);


module.exports = router;