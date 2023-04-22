const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 60 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        default: 0
    },
    discountPercentage: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: [true, 'Please enter availibility stock for this product'],
        default: 0
    },
    brand: {
        type: String,
        required: [true, 'Please enter product brand']
    },
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'smartphones',
                'laptops',
                'fragrances',
                'skincare',
                'groceries',
                'home-decoration',
                'furniture',
                'tops',
                'womens-dresses',
                'womens-shoes',
                'mens-shirts',
                'mens-shoes',
                'mens-watches',
                'womens-watches',
                'womens-bags',
                'womens-jewellery',
                'sunglasses',
                'automotive',
                'motorcycle',
                'lighting'
            ],
            message: 'Please select correct category for product'
        }
    },
    thumbnail: {
        type: String,
        required: [true, 'Please enter product thumbnail']
    },
    images: []
})

module.exports = mongoose.model('Product', productSchema);