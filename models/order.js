const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  items: {
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: "products"
      },
      quantity: {
        type: Number,
        default: 1
      }
    }],
    required: true
  },
  isCart: {
    type: Boolean,
    default: true
  },
  shipAddress: {
    type: String,
    required: true
  },
  delivery: {
    type: String,
    default: "Pending"
  },
  salesDetails:{
    type: Object,
    default: {}
  }

});

const validateOrder = {
  order: Joi.object().keys({
    customer: Joi.string().required(),
    items: Joi.array().items(
      Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().required()
      })
    ).min(1).required(),
    shipAddress: Joi.string().required()
  })
};

const Order = new mongoose.model("orders", orderSchema);

exports.Order = Order;
exports.validateOrder = validateOrder;
