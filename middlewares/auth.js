const User = require('../models/userModel');
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) {
        return next(
            res.status(401).json({
                success: 0,
                message: 'You have not authorised to create an order, please login before order.'
            })
        )
    }

    const deducted = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(deducted.id);
    next();
}