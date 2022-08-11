const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { User } = require("../models/User");
const { myDecrypt } = require("../rsa");

// user controller
module.exports = {
    login: async (req, res) => {
    
        let password = myDecrypt(req.body.password);
        console.log(password);
        const user = await User.findOne({ email:req.body.email });
        
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }  

        let compare = await bcrypt.compare(password, user.password);
        
        if (!compare) {
            return res.status(401).json({
                message: "User not found"
            });
        }  

        const token = jwt.sign({ id: user._id, name:user.name, role: user.role}, "ZEHORIT", {
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

            req.body.password = myDecrypt(req.body.password);
            console.log(req.body.password);
            req.body.password = await bcrypt.hash(req.body.password, 10);
            console.log(req.body.password);
            // create user
            const newUser = new User(req.body);
            // save user
            const user = await newUser.save();
            // chack if user is saved
            if (user) {
                // send user
                res.json({register: true});
            }else{
                // send error
                res.status(400).json({register: false});
            }
        } catch (error) {
            // send error
            res.status(400).json({register: false});
        }
    },
    // get all users
    getAll: async (req, res) => {
        let filter = {};
        if (res.locals.role != "admin") filter = { role: "customer" };
        try {
            // get all users
            const users = await User.find(filter);
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
            res.send(user);
            
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    }, 
    getByEmail: async (email) => {
        try {
            // get user by id
            const user = await User.find({email});
            // check if user is found
            if (user) {
                // send user
                return user;
            }
        } catch (error) {
            // send error
           return false;
        }
    }, 
    getProfile: async (req, res) => {
        try {
            // get user by id
            const user = await User.findById(res.locals.user_id);
            // unset password
            user.password = undefined;
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
    // changePassword user
    changePassword: async (email , password) => {
        try {
            password = await bcrypt.hash(password, 10);
            // get user by id
            const user = await User.updateOne({email},{password});
            // check if user is found
            return user;
        } catch (error) {
            // send error
            return false;
        }
    },
    update: async (req, res) => {
        try {
            // get user by id
            const user = await User.findByIdAndUpdate(req.body._id, req.body);
            // check if user is found
            if (user) {
                // send user
                res.json(user);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    updateProfile: async (req, res) => {
        try {
            // get user by id
            const user = await User.findByIdAndUpdate(res.locals.user_id, req.body, { new: true });
            // check if updated
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


        
