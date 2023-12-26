const express = require('express');
const { registerUser, loginUser, logoutUser, loginStatus, forgotPassword, changePassword, resetPassword } = require('../controllers/userControllers');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.delete('/', logoutUser);
router.get("/loggedin", loginStatus);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;

