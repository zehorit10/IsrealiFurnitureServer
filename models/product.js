const mongoose = require("mongoose");
const Joi = require('joi');
const { number } = require("joi");

// product object schema
/**
 * {
    "name":"",
    "categories":"",
    "sku":"",
    "price":"",
    "discount":"",
    "stock":"",
    "description":"",
    "image":"",
    "isActive":""
  }
 */

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 80,
    required: true
  },
  category: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    minlength: 3,
    maxlength: 50
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  discount: {
    type: Number,
    max: 100,
    min: 0
  },
  stock: {
    type: Number,
    min: 0,
    required: true
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 255
  },
  image: {
    type: String,
    default: 'https://www.freeiconspng.com/uploads/no-image-icon-4.png',
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const validateProduct = {
  product: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(80)
      .required(),
    category: Joi.number().min(0).required(),
    sku: Joi.string().required().min(3).max(50),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required(),
    discount: Joi.number().min(0).max(100),
    image: Joi.string().required(),
    description: Joi.string().min(10).max(255),
    isAvailable: Joi.boolean()
  }),
}
const Product = new mongoose.model("products", productSchema);

exports.Product = Product;
exports.validateProduct = validateProduct;
