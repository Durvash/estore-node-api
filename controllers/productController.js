const Product = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: 1,
        products
    })
}

exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    // console.log("data >> ",product);
    if(!product) {
        return res.status(404).json({
            success: 0,
            message: 'Product not found'
        })
    }

    res.status(200).json({
        success: 1,
        product
    })
}