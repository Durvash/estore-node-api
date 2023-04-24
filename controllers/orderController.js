const Order = require('../models/orderModel');
const Product = require('../models/orderModel');

exports.newOrder = async (req, res, next) => {
    try {
        const {
            shippingInfo,
            shippingPrice,
            orderItems,
            totalPrice,
            paymentInfo
        } = req.body;

        const order = await Order.create({
            shippingInfo,
            shippingPrice,
            orderItems,
            totalPrice,
            paymentInfo,
            user: req.user._id
        })

        res.status(200).json({
            success: 1,
            order
        })

    } catch (error) {

        res.status(500).json({
            success: 0,
            message: `Order Failed, ${$error.message}`
        })
    }
}