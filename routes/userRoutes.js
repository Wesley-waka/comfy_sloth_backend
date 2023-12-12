const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userControllers');
const router = express.Router;


router.post('/', registerUser);
router.post('/', loginUser);
router.delete('/', logoutUser);


module.exports = router;

