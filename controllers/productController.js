const Product = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
    // console.log(req.query);
    var query = {}; // { category: req.query.category, price: { $gt: req.query.from_price, $lt: req.query.to_price} }
    if(req.query.category) {
        query = {...query, category: req.query.category};
    }
    if(req.query.from_price && req.query.to_price) {
        query = {...query, price: { $gt: req.query.from_price, $lt: req.query.to_price}};
    }
    
    const products = await Product.find(query);
    res.status(200).json({
        success: 1,
        products
    })
}

exports.getSingleProduct = async (req, res, next) => {
    try {
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
        
    } catch (error) {

        res.status(404).json({
            success: 0,
            message: `Product id is not valid`  // ${error.message}
        })
    }
}