const { Product } = require("../models/Product");

//product controller
module.exports = {
    // create product
    create: async (req, res) => {
        try {
            // create product
            const newProduct = new Product(req.body);
            // save product
            const product = await newProduct.save();
            // chack if product is saved
            if (product) {
                // send product
                res.send(product);
            }else{
                console.log(123);
                // send error
                res.status(400).send("Product not created");
            }
        } catch (error) {
            console.log(error);
            // send error
            res.status(400).send(error); 
        }
    }, 
    // get all products
    getAll: async (req, res) => {
        try {
            let category = req.params.category;
            // get all products
            const products = category == 0 ? await Product.find() : await Product.find({category: category});
            // check if products are found
            if (products) {
                // send products
                res.send(products);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    // get product by id
    getById: async (req, res) => {
        try {
            // get product by id
            const product = await Product.findById(req.params.id);
            // check if product is found
            if (product) {
                // send product
                res.send(product);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    // update product
    update: async (req, res) => {
        try {
            // get product by id
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            // check if product is found
            if (product) {
                // send product
                res.send(product);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    // delete product
    delete: async (req, res) => {
        try {
            // get product by id
            const product = await Product.findByIdAndDelete(req.params.id);
            // check if product is found
            if (product) {
                // send product
                res.send(product);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    }
}   
