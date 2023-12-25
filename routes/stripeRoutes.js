const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const payment = require("../controllers/stripeControllers");

router.post('/', payment);


module.exports = router;