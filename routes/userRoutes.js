const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userControllers');
const router = express.Router();


router.post('/signup', registerUser);
router.post('/login', loginUser);
router.delete('/', logoutUser);


module.exports = router;

