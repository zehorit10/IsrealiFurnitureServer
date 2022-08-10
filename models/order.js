const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

/*{
  "customer":"62b09b001eda80be4c5bc655",
  "items":{
    ["product":"62d556694c6ae6d5e4b8c9d0", "quantity":"3"],
    ["product":"62d556de4c6ae6d5e4b8c9d2", "quantity":"2"]
  },
  "cost":"500",
  "isCart":"true",
  "shipAddress":"aporzim 19",
  "delivery":"Pending",
  "salesDetails":""
}*/


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
  ////////////////////////////////////////////////////////////////
  cost: {
    type: Number,
    min: 0,
    default: 0
  },
  isCart: {
    type: Boolean,
    default: true
  },
  shipAddress: {
    type: String
  },
  /*
  1 = Pending
  2 = Delivered
  3 = Canceled
  */
  delivery: {
    type: String,
    default: "1"
  },
  date: {
    type: Date,
    default: Date.now
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
    shipAddress: Joi.string().required(),
    cost: Joi.number().min(0).required()

  })
};

const Order = new mongoose.model("orders", orderSchema);

exports.Order = Order;
exports.validateOrder = validateOrder;
