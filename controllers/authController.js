const User = require('../models/userModel');

exports.registerUser = async (req, res, next) => {
    try {
        // console.log(req.body);
        const { name, email, password, avatar } = req.body;
        const user = await User.create({ name, email, password, avatar });
        
        const token = user.getJwtToken();

        res.status(200).json({
            success: 1,
            token,
            // user
        })

    } catch (error) {

        res.status(500).json({
            success: 0,
            message: `Registration failed, please enter valid detail! : ${error.message}`
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

        const token = await user.getJwtToken();

        res.status(200).json({
            success: 1,
            token,
            user
        })

    } catch (error) {

        res.status(401).json({
            success: 0,
            message: 'Invalid Email or Password'
        })
    }
}