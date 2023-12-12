const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

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


module.exports = {
    registerUser,
    loginUser,
    logoutUser
}

