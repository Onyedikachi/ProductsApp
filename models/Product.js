const mongoose = require('mongoose');

const ProductSchema =  new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    category: String,
    image: String,
    color: String,
});

const Product = mongoose.model('Product', ProductSchema)


module.exports =  Product;