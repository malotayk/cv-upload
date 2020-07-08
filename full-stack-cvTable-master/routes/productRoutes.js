const mongoose = require('mongoose');
const Product = require('../models/Product');
//const Product = mongoose.model('products');

module.exports = (app) => {

    app.get(`/api/product`, async (req, res) => {
        let products = await Product.find();
        return res.status(200).send(products);
    });

    app.post(`/api/product`, async (req, res) => {
        let product = new Product({
            cv_text: req.body.cv_text

        })
        await product.save();
        return res.json(await Product.find());
    })

    app.put(`/api/product/:id`, async (req, res) => {
        const {id} = req.params;

        let product = await Product.findByIdAndUpdate(id, req.body);

        return res.status(202).send({
            error: false,
            product
        })

    });

    app.delete(`/api/product/:id`, async (req, res) => {
        const {id} = req.params;

        let product = await Product.findByIdAndDelete(id);

        return res.status(202).send({
            error: false,
            product
        })

    })

}