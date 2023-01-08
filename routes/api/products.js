'use strict';

const express = require('express');
const createError = require('http-errors');
const Product = require('../../models/Products');

const router = express.Router();

// GET /api/products
router.get('/', async (req, res, next) => {
    try {
        // filters
        const name = req.query.name;
        const price = req.query.price;
        const tags = req.query.tags;
        const sell = req.query.sell

        // paginacion
        const skip = req.query.skip;
        const limit = req.query.limit;

        // filtering
        const filter = {};

        if (name) {
            filter.name = name
        }

        if (price) {
            filter.price = price
        }

        const products = await Product.lista(filter, skip, limit);
        res.json({ results: products });
    } catch(err) {
        next(err);
    }
});

// POST /api/products
// Create a new product
router.post('/', async (req, res, next) => {
    try {
        const productData = req.body;

        const product = new Product(productData);

        const productSaved = await product.save();

        res.json({ result: productSaved });
    } catch(err) {
        next(err);
    }
});

// DELETE /api/products/:id
// delete a product
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return next(createError(404));
        }

        await Product.deleteOne({ _id: id });

        res.json();
    } catch (err) {
        next(err);
    }
});

module.exports = router;