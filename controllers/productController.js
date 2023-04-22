const Product = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: 1,
        products
    })
}