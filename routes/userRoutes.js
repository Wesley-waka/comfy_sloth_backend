const express = require('express');
const { registerUser, loginUser, logout, loginStatus, forgotPassword, changePassword, resetPassword } = require('../controllers/userControllers');
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.delete('/', logout);
router.get("/loggedin", loginStatus);
router.patch("/changepassword", protect, changePassword);
router.post("/password/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

module.exports = router;

