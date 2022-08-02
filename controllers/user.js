const jwt = require('jsonwebtoken');
const { User } = require("../models/User");

// user controller
module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }   
        const token = jwt.sign({ id: user._id }, "ZEHORIT", {
            expiresIn: "1h"
        });
        return res.json({
            token,
            isAuth: true,
            role: user.role
        });
    },
    // create user
    create: async (req, res) => {
        try {
            // create user
            const newUser = new User(req.body);
            // save user
            const user = await newUser.save();
            // chack if user is saved
            if (user) {
                // send user
                res.send(user);
            }else{
                // send error
                res.status(400).send("User not created");
            }
        } catch (error) {
            // send error
            res.status(400).send(error); 
        }
    },
    // get all users
    getAll: async (req, res) => {
        try {
            // get all users
            const users = await User.find();
            // check if users are found
            if (users) {
                // send users
                res.send(users);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    // get user by id
    getById: async (req, res) => {
        try {
            // get user by id
            const user = await User.findById(req.params.id);
            // check if user is found
            if (user) {
                // send user
                res.send(user);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    }, 
    // update user
    update: async (req, res) => {
        try {
            // get user by id
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            // check if user is found
            if (user) {
                // send user
                res.send(user);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    // delete user
    delete: async (req, res) => {
        try {
            // get user by id
            const user = await User.findByIdAndDelete(req.params.id);
            // check if user is found
            if (user) {
                // send user
                res.send(user);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    }
}
// end of user controller


        
