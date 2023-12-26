const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const asyncHandler = require("express-async-handler");

const generateToken = (id) => {
    jwt.sign({ id }, process.env.JWT, { expiresIn: '1d' });
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please Fill in all details');
    };

    const userExist = await User.find({ email });

    if (userExist) {
        res.status(400);
        throw new Error('User Exists')
    };

    const hashedPassword = await bcrypt.hash(password);

    let user;

    try {
        user = await new User.create({
            name,
            email,
            password: hashedPassword
        });
    } catch (error) {
        res.status(400)
        throw new Error('User registration failed,please try again.');
    };

    res.status(201).json({ user })
};


const loginUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new Error('Fill in all details!');
    }

    let user;

    try {
        user = await User.find({ email })
    } catch (error) {
        res.status('404');
        throw new Error('User does not Exist,please Sign up');
    }


    const passwordMatch = await bcrypt.compare(user.password, password);

    if (user && passwordMatch) {
        const token = generateToken(user.id);

        res.cookie("token", token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            secure: true,
            sameSite: "none"
        });
    }

    res.status(200).json({ name, email, token });
};

const logoutUser = (req, res) => {
    res.cookie("token", "", {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    });

    res.status(201).json({ message: 'Logout Successful' })
};

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }
    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      return res.json(true);
    }
    return res.json(false);
  });

// Change Password
const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { oldPassword, password } = req.body;
  
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
    //Validate
    if (!oldPassword || !password) {
      res.status(400);
      throw new Error("Please add old and new password");
    }
  
    // check if old password matches password in DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
  
    // Save new password
    if (user && passwordIsCorrect) {
      user.password = password;
      await user.save();
      res.status(200).send("Password change successful");
    } else {
      res.status(400);
      throw new Error("Old password is incorrect");
    }
  });

// forgotPassword
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }
  
    // Delete token if it exists in DB
    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }
  
    // Create Reste Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);
  
    // Hash token before saving to DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Save Token to DB
    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
    }).save();
  
    // Construct Reset Url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    // Reset Email
    const message = `
    <h2>Hello ${user.name}</h2>
    <p>Please use the url below to reset your password</p>  
    <p>This reset link is valid for only 30minutes.</p>

    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

    <p>Regards...</p>
    <p>Pinvent Team</p>
    `;
    const subject = "Password Reset Request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
    } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
    }
});


// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;
  
    // Hash token, then compare to Token in DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // fIND tOKEN in DB
    const userToken = await Token.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
    });
  
    if (!userToken) {
      res.status(404);
      throw new Error("Invalid or Expired Token");
    }
  
    // Find user
    const user = await User.findOne({ _id: userToken.userId });
    user.password = password;
    await user.save();
    res.status(200).json({
      message: "Password Reset Successful, Please Login",
    });
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    loginStatus,
    changePassword,
    forgotPassword,
    resetPassword,
}

