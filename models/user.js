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
    "phone":""
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
    minlength: 2,
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
    minlength: 5,
    maxlength: 50
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// userSchema.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const passwordHash = await bcrypt.hash(this.password, salt);
//     this.password = passwordHash;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
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
    name: Joi.string()
      .min(1)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required()
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
