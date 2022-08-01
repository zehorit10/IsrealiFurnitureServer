const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
//const { JWT_SECRET } = require("../config/keys");
const JWT_SECRET = "ZEHORIT";

// user object schema
/**
 * {
    "email":"",
    "password":"",
    "role":"",
    "name":"",
    "phone":"",
    "address":{
      "street":"",
      "number":"", 
      "city":""
    }
  }
 */

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true
  },
  role: {
    type: String,
    default: "customer"
  },
  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  address: {
    type: [
      {
        street: {
          type: String,
          minlength: 5,
          maxlength: 255,
          required: true
        },
        number: {
          type: Number,
          min: 0,
          required: true
        },
        city: {
          type: String,
          minlength: 5,
          maxlength: 255,
          required: true
        }
      }
    ],
  },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.methods.generateAuthToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        role: this.role,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
      },
      JWT_SECRET
    );
  } catch (err) {
    throw new Error(err);
  }
};
const User = new mongoose.model("users", userSchema);

const validateUser = {
  register: Joi.object().keys({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required(),
    confirmPassword: Joi.string()
      .min(8)
      .max(255)
      .required(),
    name: Joi.string()
      .min(1)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required()
  }),
  address: Joi.object().keys({
    street: Joi.string()
      .min(5)
      .max(255)
      .required(),
    city: Joi.string()
      .min(5)
      .max(255)
      .required(),
    number: Joi.number().min(0).required(),
  }),
  login: Joi.object().keys({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
  })
}
exports.validateUser = validateUser;
exports.User = User;
