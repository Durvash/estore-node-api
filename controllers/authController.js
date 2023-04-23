const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    try {
        // console.log(req.body);
        const { name, email, password, avatar } = req.body;
        const user = await User.create({ name, email, password, avatar });
        
        sendToken(user, 200, res);
        
    } catch (error) {

        res.status(500).json({
            success: 0,
            message: `Registration failed, ${error.message}`
        })
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email}).select('+password');
        if(!user) {
            return res.status(401).json({
                success: 0,
                message: 'Invalid Email or Password'
            })
        }
        
        // check password is corrent or not
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched) {
            return res.status(401).json({
                success: 0,
                message: 'Invalid Email or Password'
            })
        }

        sendToken(user, 200, res);

    } catch (error) {

        res.status(401).json({
            success: 0,
            message: 'Invalid Email or Password'
        })
    }
}

exports.userAccount = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) {
            return res.status(401).json({
                success: 0,
                message: 'You have not authorised to access the account page, please login before access it.'
            })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        res.status(201).json({
            success: 1,
            user
        })

    } catch (error) {

        res.status(400).json({
            success: 0,
            message: 'User account detail not found'
        })
    }
}

exports.userLogout = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: 1,
        message: 'Logout successfully.'
    })
}