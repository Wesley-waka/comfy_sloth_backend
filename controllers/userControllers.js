const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const HttpError = require('../models/http-error')

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
const registerUser = asyncHandler(async (req, res,next) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    const error = new HttpError(
      "Please fill in all required fields",
      400
    );
    return next(error);
  }
  if (password.length < 6) {
    res.status(400)
    const error = new HttpError(
      "Password must be up to 6 characters",
      400
    );
    return next(error);
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400)
    const error = new HttpError(
      "Email has already been registered",
      400
    );
    return next(error);
  }

  const salt = await bcrypt.genSalt(10); 
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //   Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { name, email,password} = user;
    console.log(name,email,password)
    res.status(201).json({
      name,
      email,
      token,
    });
  } else {
    res.status(400)
    const error = new HttpError(
      "Invalid user data",
      400
    );
    return next(error);
  }
});

// Login User
const loginUser = asyncHandler(async (req, res,next) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    res.status(400)
    const error = new HttpError(
      "Please add email and password",
      400
    );
    return next(error);
    
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400)
    const error = new HttpError(
      "User not found, please signup",
      400
    );
    return next(error);
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //   Generate Token
  const token = generateToken(user._id);
  
  if(passwordIsCorrect){
   // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });
}
  if (user && passwordIsCorrect) {
    const { _id, name, email} = user;
    res.status(200).json({
      _id,
      name,
      email,
      token,
    });
  } else {
    // const error = new HttpError(
    //   "Invalid email or password",
    //   400
    // );
    // return next(error);
    res.status(400)
    throw new Error("Invalid email or password");
  }
});

// Logout User
const logout = asyncHandler(async (req, res,next) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  console.log('logout')
  return res.status(200).json({ message: "Successfully Logged Out" });
});

// Get User Data
const getUser = asyncHandler(async (req, res,next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    const error = new HttpError(
      "User Not Found",
      400
    );
    return next(error)
    
  }
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res,next) => {
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

// Update User
const updateUser = asyncHandler(async (req, res,next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, photo, phone, bio } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } else {
    const error = new HttpError(
      "User Not Found",
      400
    );
    return next(error)
    
  }
});

const changePassword = asyncHandler(async (req, res,next) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400)
    const error = new HttpError(
      "User not found, please signup",
      400
    );
    return next(error)
  }
  //Validate
  if (!oldPassword || !password) {
    res.status(400)
    const error = new HttpError(
      "Please add old and new password",
      400
    );
    return next(error)
  }

  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password change successful");
  } else {
    res.status(400)
    const error = new HttpError(
      "Old password is incorrect",
      400
    );
    return next(error)
  }
});

const forgotPassword = asyncHandler(async (req, res,next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400)
    const error = new HttpError(
      "User does not exist",
      400
    );
    return next(error)
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
      <p>Comfy Store Team</p>
    `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = 'wesleywaka72@gmail.com';

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (err) {
    const error = new HttpError(
      "Email not sent, please try again",
      500
    )
    return next(error)
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res,next) => {
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
    res.status(400)
    const error = new HttpError(
      "Invalid or Expired Token",
      400
    )
    return next(error)
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
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};