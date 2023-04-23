const Product = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
    try {
        // console.log(req.query);
        const { category, from_price, to_price } = req.query;
        var query = {};
        
        if(category) {
            query = {...query, category: category};
        }
        if(from_price && to_price) {
            query = {...query, price: { $gt: from_price, $lt: to_price}};
        }
        
        const products = await Product.find(query);
        res.status(200).json({
            success: 1,
            products
        })

    } catch (error) {

        res.status(404).json({
            success: 0,
            message: 'Products are not found'
        })
    }
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