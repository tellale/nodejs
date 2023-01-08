'use strict';

const mongoose = require('mongoose');

// Define scheme for products
const productSchema = new mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
    tags: [String],
});

productSchema.statics.lista = function(filter, skip, limit, fields, sort) {
    const query = Product.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec()
}

// Create model
const Product = mongoose.model('Product', productSchema);

// Export model
module.exports = Product;